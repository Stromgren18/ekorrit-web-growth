import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminShell } from "@/components/admin/AdminShell";
import { FaltForm } from "@/components/admin/EntityForm";
import { arAdmin } from "@/lib/admin/auth";
import { hittaSektion, SEKTIONER } from "@/lib/admin/sections";
import {
  hamtaJson,
  listaRader,
  sparaJson,
  sparaRad,
  sidNycklar,
  taBortRad,
  useUppdateraSajt,
  type Rad,
} from "@/lib/admin/api";

export const Route = createFileRoute("/admin/$section")({
  ssr: false,
  beforeLoad: async () => {
    if (!(await arAdmin())) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: SektionSida,
});

function SektionSida() {
  const { section } = Route.useParams();
  const sektion = hittaSektion(section) ?? SEKTIONER[0]!;

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">{sektion.namn}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{sektion.beskrivning}</p>
      <div className="mt-8">
        {sektion.slag === "tabell" ? <TabellVy sektion={sektion} /> : <JsonVy sektion={sektion} />}
      </div>
    </AdminShell>
  );
}

function TabellVy({ sektion }: { sektion: NonNullable<ReturnType<typeof hittaSektion>> }) {
  const [rader, setRader] = useState<Rad[] | null>(null);
  const [redigerar, setRedigerar] = useState<Rad | null>(null);
  const [nyRad, setNyRad] = useState(false);
  const [sparar, setSparar] = useState(false);
  const [meddelande, setMeddelande] = useState<string | null>(null);
  const uppdateraSajt = useUppdateraSajt();

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
    setRedigerar(null);
    setNyRad(false);
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
      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">{nyRad ? "Ny post" : "Redigera"}</h2>
        <div className="mt-5">
          <FaltForm
            falt={sektion.falt ?? []}
            rad={rad}
            onAndra={(nyckel, varde) =>
              setRedigerar((prev) => (prev ? { ...prev, [nyckel]: varde } : prev))
            }
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
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setRedigerar(null);
              setNyRad(false);
            }}
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
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{rader.length} poster</p>
        <Button size="sm" className="rounded-full" onClick={() => setNyRad(true)}>
          <Plus className="size-4" aria-hidden /> Ny post
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
  const mall: Record<string, unknown> = rader.length > 0 ? rader[0]! : {};
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

function JsonVy({ sektion }: { sektion: NonNullable<ReturnType<typeof hittaSektion>> }) {
  const [nycklar] = useState<string[]>(sektion.sidnyckel === "site" ? ["site"] : [...sidNycklar]);
  const [vald, setVald] = useState<string>(nycklar[0] ?? "hem");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const uppdateraSajt = useUppdateraSajt();

  useEffect(() => {
    let aktivt = true;
    hamtaJson(sektion, vald).then((varde) => {
      if (aktivt) setText(JSON.stringify(varde, null, 2));
    });
    return () => {
      aktivt = false;
    };
  }, [sektion, vald]);

  async function spara() {
    try {
      const varde = JSON.parse(text) as Record<string, unknown>;
      const res = await sparaJson(sektion, vald, varde);
      setStatus(res.ok ? "Sparat!" : `Kunde inte spara: ${res.fel}`);
      if (res.ok) uppdateraSajt();
    } catch {
      setStatus("Ogiltig JSON – kontrollera klamrar och kommatecken.");
    }
  }

  return (
    <div className="max-w-3xl">
      {nycklar.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {nycklar.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setVald(n)}
              className={
                vald === n
                  ? "rounded-full bg-primary px-3.5 py-1.5 text-xs text-primary-foreground"
                  : "rounded-full border border-border px-3.5 py-1.5 text-xs hover:bg-secondary"
              }
            >
              {n}
            </button>
          ))}
        </div>
      ) : null}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={22}
        spellCheck={false}
        className="mt-4 w-full rounded-2xl border border-border bg-card p-4 font-mono text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      <div className="mt-4 flex items-center gap-3">
        <Button className="rounded-full" onClick={() => void spara()}>
          <Save className="size-4" aria-hidden /> Spara
        </Button>
        {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
      </div>
    </div>
  );
}
