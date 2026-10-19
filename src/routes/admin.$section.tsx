import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminShell } from "@/components/admin/AdminShell";
import { FaltForm } from "@/components/admin/EntityForm";
import { AdminJsonForm } from "@/components/admin/AdminJsonForms";
import { Forhandsvisning } from "@/components/admin/Forhandsvisning";
import { useAdminEditor, useAdminNavigation } from "@/components/admin/AdminNavigation";
import { harAndringar } from "@/lib/admin/navigation";
import { arAdmin } from "@/lib/admin/auth";
import { radIdentitet, sparaUtkast, tabortUtkast } from "@/lib/admin/preview";
import { hittaSektion, SEKTIONER } from "@/lib/admin/sections";
import {
  listaRader,
  sparaRad,
  sidNycklar,
  taBortRad,
  useUppdateraSajt,
  type Rad,
} from "@/lib/admin/api";

export const Route = createFileRoute("/admin/$section")({
  ssr: false,
  head: ({ params }) => {
    const title = `${hittaSektion(params.section)?.namn ?? "Innehåll"} – Admin | Ekorrit AB`;
    const description = "Hantera och redigera Ekorrit AB:s webbplatsinnehåll.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] };
  },
  beforeLoad: async () => {
    if (!(await arAdmin())) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: SektionSida,
});

function SektionSida() {
  const { section } = Route.useParams();
  const sektion = hittaSektion(section) ?? SEKTIONER[0];
  if (!sektion) return null;

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">{sektion.namn}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{sektion.beskrivning}</p>
      <div className="mt-8">
        {sektion.slag === "tabell" ? (
          <TabellVy key={section} sektion={sektion} />
        ) : (
          <AdminJsonForm key={section} sektion={sektion} sidNycklar={[...sidNycklar]} />
        )}
      </div>
    </AdminShell>
  );
}

function TabellVy({ sektion }: { sektion: NonNullable<ReturnType<typeof hittaSektion>> }) {
  const [rader, setRader] = useState<Rad[] | null>(null);
  const [redigerar, setRedigerar] = useState<Rad | null>(null);
  const [original, setOriginal] = useState<Rad | null>(null);
  const [nyRad, setNyRad] = useState(false);
  const [sparar, setSparar] = useState(false);
  const [meddelande, setMeddelande] = useState<string | null>(null);
  const [visarForhandsvisning, setVisarForhandsvisning] = useState(false);
  const [forhandsVersion, setForhandsVersion] = useState(0);
  const uppdateraSajt = useUppdateraSajt();
  const { overview } = useAdminNavigation();
  const tabell = sektion.tabell;
  const stangRedigering = () => {
    setRedigerar(null);
    setOriginal(null);
    setNyRad(false);
    setVisarForhandsvisning(false);
  };
  useAdminEditor({
    dirty: redigerar !== null && harAndringar(original, redigerar),
    discard: () => {
      if (tabell && redigerar) {
        tabortUtkast(tabell, radIdentitet(redigerar));
        if (original) tabortUtkast(tabell, radIdentitet(original));
      }
    },
    overview: stangRedigering,
  });

  /** Publik sökväg där posten syns – används för förhandsgranskningen. */
  const forhandsSokvag = (rad: Rad | null): string => {
    const slug = rad?.["slug"] ? String(rad["slug"]) : "";
    switch (sektion.tabell) {
      case "aktuellt":
        return slug ? `/aktuellt/${slug}` : "/aktuellt";
      case "tjanster":
        return slug ? `/tjanster/${slug}` : "/tjanster";
      case "kundreferenser":
        return "/kundreferenser";
      case "faq":
        return "/faq";
      case "dokument":
        return "/dokument";
      case "medarbetare":
        return "/medarbetare";
      default:
        return "/";
    }
  };

  const uppdateraUtkast = (rad: Rad) => {
    if (!tabell) return;
    sparaUtkast(tabell, radIdentitet(original ?? rad), rad);
    setForhandsVersion((v) => v + 1);
  };

  useEffect(() => {
    let aktivt = true;
    listaRader(sektion).then((data) => {
      if (aktivt) setRader(data);
    });
    return () => {
      aktivt = false;
    };
  }, [sektion]);

  if (rader === null) {
    return <p className="text-sm text-muted-foreground">Laddar…</p>;
  }

  async function spara(rad: Rad, arNy: boolean) {
    setSparar(true);
    setMeddelande(null);
    const res = await sparaRad(sektion, rad, arNy);
    setSparar(false);
    if (!res.ok) {
      setMeddelande(`Kunde inte spara: ${res.fel}`);
      return;
    }
    setRader(await listaRader(sektion));
    if (tabell) {
      tabortUtkast(tabell, radIdentitet(rad));
      if (original) tabortUtkast(tabell, radIdentitet(original));
    }
    stangRedigering();
    setMeddelande("Sparat!");
    uppdateraSajt();
  }

  async function taBort(id: string) {
    await taBortRad(sektion, id);
    setRader(await listaRader(sektion));
    setRedigerar(null);
    setNyRad(false);
    setMeddelande("Raderad.");
    uppdateraSajt();
  }

  if (redigerar || nyRad) {
    const rad: Rad = redigerar ?? { id: "", ...(tomRad(sektion, rader)) };
    return (
      <div>
      <Button type="button" variant="ghost" className="mb-4 rounded-full" onClick={overview} disabled={sparar}>
        <ArrowLeft className="size-4" aria-hidden /> Tillbaka
      </Button>
      <div className={visarForhandsvisning ? "grid gap-6 xl:grid-cols-[minmax(0,28rem)_1fr]" : ""}>
      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          {nyRad ? (sektion.nyckel === "medarbetare" ? "Lägg till medarbetare" : "Ny post") : "Redigera"}
        </h2>
        <div className="mt-5">
          <FaltForm
            falt={sektion.falt ?? []}
            rad={rad}
            onAndra={(nyckel, varde) => {
              setRedigerar((prev) => {
                const nasta = prev ? { ...prev, [nyckel]: varde } : prev;
                if (nasta && visarForhandsvisning) uppdateraUtkast(nasta);
                return nasta;
              });
            }}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            className="rounded-full"
            disabled={sparar}
            onClick={() =>
              void spara({ ...rad, id: rad.id || `demo-${Date.now()}` }, nyRad || !rad.id)
            }
          >
            <Save className="size-4" aria-hidden /> {sparar ? "Sparar…" : "Spara"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              if (visarForhandsvisning) {
                setVisarForhandsvisning(false);
              } else {
                uppdateraUtkast(rad);
                setVisarForhandsvisning(true);
              }
            }}
          >
            <Eye className="size-4" aria-hidden />
            {visarForhandsvisning ? "Stäng förhandsgranskning" : "Förhandsgranska"}
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={overview}
          >
            Avbryt
          </Button>
          {!nyRad && rad.id ? (
            <Button variant="ghost" className="rounded-full text-destructive" onClick={() => void taBort(rad.id)}>
              Radera
            </Button>
          ) : null}
        </div>
        {meddelande ? <p className="mt-3 text-sm text-muted-foreground">{meddelande}</p> : null}
      </div>
      </div>
      {visarForhandsvisning ? (
        <Forhandsvisning
          sokvag={forhandsSokvag(rad)}
          version={forhandsVersion}
          onStang={() => setVisarForhandsvisning(false)}
        />
      ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{rader.length} poster</p>
        <Button size="sm" className="rounded-full" onClick={() => {
          const ny = { id: "", ...tomRad(sektion, rader) };
          setOriginal(ny);
          setRedigerar(ny);
          setNyRad(true);
        }}>
          <Plus className="size-4" aria-hidden />
          {sektion.nyckel === "medarbetare" ? "Lägg till medarbetare" : "Ny post"}
        </Button>
      </div>
      <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card">
        {rader.map((rad) => (
          <li key={rad.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-secondary/60"
              onClick={() => {
                setRedigerar(rad);
                setOriginal(rad);
                setNyRad(false);
              }}
            >
              <span className="truncate text-sm font-medium">
                {String(rad[sektion.rubrikNyckel] ?? rad.id)}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">Redigera →</span>
            </button>
          </li>
        ))}
        {rader.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">Inga poster ännu.</li>
        ) : null}
      </ul>
      {meddelande ? <p className="mt-3 text-sm text-muted-foreground">{meddelande}</p> : null}
    </div>
  );
}


function tomRad(sektion: NonNullable<ReturnType<typeof hittaSektion>>, rader: Rad[]): Record<string, unknown> {
  const falt = sektion.falt ?? [];
  const mall: Record<string, unknown> = rader[0] ?? {};
  const ut: Record<string, unknown> = {};
  for (const f of falt) {
    if (f.typ === "boolean") ut[f.nyckel] = false;
    else if (f.typ === "number") ut[f.nyckel] = null;
    else if (f.typ === "select") ut[f.nyckel] = f.alternativ?.[0] ?? "";
    else if (f.typ === "stringList") ut[f.nyckel] = [];
    else if (f.typ === "repeat") ut[f.nyckel] = [];
    else if (f.typ === "image") ut[f.nyckel] = null;
    else ut[f.nyckel] = mall[f.nyckel] !== undefined ? "" : "";
  }
  return ut;
}

