import { useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaltForm } from "@/components/admin/EntityForm";
import { hamtaJson, sparaJson, useUppdateraSajt } from "@/lib/admin/api";
import type { Sektion } from "@/lib/admin/sections";

type EnkelTyp = "text" | "textarea" | "email" | "tel" | "url" | "image" | "stringList";
type EnkelFalt = {
  path: string[];
  label: string;
  typ: EnkelTyp;
  krav?: boolean;
  hjalp?: string;
  placeholder?: string;
};
type UpprepatFalt = {
  path: string[];
  label: string;
  singular: string;
  falt: { nyckel: string; label: string; typ?: Exclude<EnkelTyp, "image" | "stringList">; krav?: boolean }[];
};
type Grupp = { titel: string; beskrivning?: string; falt: (EnkelFalt | UpprepatFalt)[] };

const SIDNAMN: Record<string, string> = {
  hem: "Startsida",
  "om-oss": "Om oss",
  tjanster: "Tjänster",
  kundreferenser: "Kundreferenser",
  faq: "Frågor & svar",
  aktuellt: "Aktuellt",
  dokument: "Dokument",
  kontakt: "Kontakt",
};

const hero = (intro = true): Grupp => ({
  titel: "Sidhuvud",
  beskrivning: "Det första besökaren ser högst upp på sidan.",
  falt: [
    { path: ["hero", "eyebrow"], label: "Liten rubrik", typ: "text" },
    { path: ["hero", "title"], label: "Huvudrubrik", typ: "text", krav: true },
    { path: ["hero", intro ? "intro" : "subtitle"], label: "Inledning", typ: "textarea", krav: true },
  ],
});

const enklaSidor = ["tjanster", "kundreferenser", "faq", "aktuellt", "dokument", "kontakt"];
const SIDSCHEMAN: Record<string, Grupp[]> = Object.fromEntries(enklaSidor.map((s) => [s, [hero()]]));
SIDSCHEMAN["hem"] = [
  {
    ...hero(false),
    falt: [
      ...hero(false).falt,
      { path: ["hero", "image"], label: "Bakgrundsbild", typ: "image" },
      { path: ["hero", "imageAlt"], label: "Bildbeskrivning", typ: "text", hjalp: "Beskriv bilden kort för personer som använder skärmläsare." },
    ],
  },
  {
    titel: "Tjänster på startsidan",
    falt: [
      { path: ["tjanster", "eyebrow"], label: "Liten rubrik", typ: "text" },
      { path: ["tjanster", "title"], label: "Rubrik", typ: "text" },
      { path: ["tjanster", "intro"], label: "Inledning", typ: "textarea" },
    ],
  },
  {
    titel: "Kundreferenser",
    falt: [
      { path: ["referenser", "eyebrow"], label: "Liten rubrik", typ: "text" },
      { path: ["referenser", "title"], label: "Rubrik", typ: "text" },
    ],
  },
  {
    titel: "Aktuellt",
    falt: [
      { path: ["aktuellt", "eyebrow"], label: "Liten rubrik", typ: "text" },
      { path: ["aktuellt", "title"], label: "Rubrik", typ: "text" },
    ],
  },
];
SIDSCHEMAN["om-oss"] = [
  hero(),
  {
    titel: "Bild",
    falt: [
      { path: ["bild", "url"], label: "Bild", typ: "image" },
      { path: ["bild", "alt"], label: "Bildbeskrivning", typ: "text" },
    ],
  },
  {
    titel: "Om företaget",
    falt: [
      { path: ["body", "title"], label: "Rubrik", typ: "text" },
      { path: ["body", "stycken"], label: "Textstycken", typ: "stringList", hjalp: "Skriv ett textstycke per rad." },
    ],
  },
  {
    titel: "Nyckeltal",
    falt: [{ path: ["nyckeltal"], label: "Nyckeltal", singular: "nyckeltal", falt: [
      { nyckel: "label", label: "Beskrivning", krav: true },
      { nyckel: "varde", label: "Värde", krav: true },
    ] }],
  },
  {
    titel: "Våra värderingar",
    falt: [{ path: ["varderingar"], label: "Värderingar", singular: "värdering", falt: [
      { nyckel: "title", label: "Rubrik", krav: true },
      { nyckel: "body", label: "Text", typ: "textarea", krav: true },
    ] }],
  },
];

const SITESCHEMA: Grupp[] = [
  { titel: "Grunduppgifter", falt: [
    { path: ["name"], label: "Företagsnamn", typ: "text", krav: true },
    { path: ["tagline"], label: "Slogan", typ: "text" },
    { path: ["description"], label: "Företagsbeskrivning", typ: "textarea" },
    { path: ["phone"], label: "Telefon", typ: "tel", krav: true, placeholder: "+46…" },
    { path: ["email"], label: "E-post", typ: "email", krav: true },
    { path: ["orgNumber"], label: "Organisationsnummer", typ: "text", krav: true, placeholder: "XXXXXX-XXXX" },
  ] },
  { titel: "Sociala medier", falt: [
    { path: ["social", "instagram"], label: "Instagram-länk", typ: "url", placeholder: "https://instagram.com/…" },
    { path: ["social", "facebook"], label: "Facebook-länk", typ: "url", placeholder: "https://facebook.com/…" },
  ] },
  { titel: "Kontor", beskrivning: "Kontaktuppgifter som visas på kontakt- och sidfoten.", falt: [
    { path: ["offices"], label: "Kontor", singular: "kontor", falt: [
      { nyckel: "city", label: "Ort", krav: true },
      { nyckel: "role", label: "Beskrivning", krav: true },
      { nyckel: "street", label: "Gatuadress", krav: true },
      { nyckel: "postal", label: "Postnummer och ort", krav: true },
      { nyckel: "phone", label: "Telefon", typ: "tel", krav: true },
      { nyckel: "email", label: "E-post", typ: "email", krav: true },
    ] },
  ] },
  { titel: "Certifieringar", falt: [
    { path: ["certifications"], label: "Certifieringar", singular: "certifiering", falt: [
      { nyckel: "name", label: "Namn", krav: true },
      { nyckel: "note", label: "Kort beskrivning" },
    ] },
  ] },
  { titel: "Kontaktuppmaning", beskrivning: "Texten som återkommer längst ned på flera sidor.", falt: [
    { path: ["cta", "title"], label: "Rubrik", typ: "text", krav: true },
    { path: ["cta", "body"], label: "Text", typ: "textarea", krav: true },
  ] },
];

function arUpprepat(falt: EnkelFalt | UpprepatFalt): falt is UpprepatFalt {
  return "falt" in falt;
}
function hamta(objekt: Record<string, unknown>, path: string[]): unknown {
  return path.reduce<unknown>((varde, nyckel) =>
    varde && typeof varde === "object" ? (varde as Record<string, unknown>)[nyckel] : undefined, objekt);
}
function satt(objekt: Record<string, unknown>, path: string[], varde: unknown): Record<string, unknown> {
  const kopia = structuredClone(objekt);
  let mal: Record<string, unknown> = kopia;
  path.forEach((nyckel, i) => {
    if (i === path.length - 1) mal[nyckel] = varde;
    else {
      const nasta = mal[nyckel];
      mal[nyckel] = nasta && typeof nasta === "object" && !Array.isArray(nasta) ? nasta : {};
      mal = mal[nyckel] as Record<string, unknown>;
    }
  });
  return kopia;
}

export function AdminJsonForm({ sektion, sidNycklar }: { sektion: Sektion; sidNycklar: string[] }) {
  const site = sektion.sidnyckel === "site";
  const [vald, setVald] = useState(site ? "site" : sidNycklar[0] ?? "hem");
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [smutsig, setSmutsig] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [sparar, setSparar] = useState(false);
  const uppdateraSajt = useUppdateraSajt();
  const laddning = useRef(0);

  useEffect(() => {
    const id = ++laddning.current;
    setData(null);
    setStatus(null);
    hamtaJson(sektion, vald).then((varde) => {
      if (id === laddning.current) {
        setData(structuredClone(varde));
        setSmutsig(false);
      }
    });
  }, [sektion, vald]);

  useEffect(() => {
    const varna = (event: BeforeUnloadEvent) => {
      if (!smutsig) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", varna);
    return () => window.removeEventListener("beforeunload", varna);
  }, [smutsig]);

  const andra = (path: string[], varde: unknown) => {
    setData((nu) => nu ? satt(nu, path, varde) : nu);
    setSmutsig(true);
    setStatus("Osparade ändringar");
  };

  async function spara(event: FormEvent) {
    event.preventDefault();
    if (!data) return;
    setSparar(true);
    setStatus("Sparar…");
    const resultat = await sparaJson(sektion, vald, data);
    setSparar(false);
    if (resultat.ok) {
      setSmutsig(false);
      setStatus("Sparat");
      uppdateraSajt();
    } else setStatus(`Kunde inte spara: ${resultat.fel}`);
  }

  function bytSida(ny: string) {
    if (ny === vald) return;
    if (smutsig && !window.confirm("Du har osparade ändringar. Vill du lämna sidan utan att spara?")) return;
    setVald(ny);
  }

  const grupper = site ? SITESCHEMA : SIDSCHEMAN[vald] ?? [hero()];
  return (
    <div className="max-w-4xl">
      {!site ? (
        <div className="mb-6">
          <Label htmlFor="sidval">Välj sida att redigera</Label>
          <select id="sidval" value={vald} onChange={(e) => bytSida(e.target.value)} className="mt-2 h-11 w-full max-w-sm rounded-xl border border-input bg-background px-3 text-sm">
            {sidNycklar.map((nyckel) => <option key={nyckel} value={nyckel}>{SIDNAMN[nyckel] ?? nyckel}</option>)}
          </select>
        </div>
      ) : null}

      {data ? (
        <form onSubmit={spara} className="space-y-6">
          {grupper.map((grupp) => (
            <section key={grupp.titel} className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-semibold">{grupp.titel}</h2>
              {grupp.beskrivning ? <p className="mt-1 text-sm text-muted-foreground">{grupp.beskrivning}</p> : null}
              <div className="mt-5 space-y-5">
                {grupp.falt.map((falt) => arUpprepat(falt) ? (
                  <UpprepadLista key={falt.path.join(".")} falt={falt} varde={hamta(data, falt.path)} onAndra={(v) => andra(falt.path, v)} />
                ) : (
                  <EnkeltFalt key={falt.path.join(".")} falt={falt} varde={hamta(data, falt.path)} onAndra={(v) => andra(falt.path, v)} />
                ))}
              </div>
            </section>
          ))}
          <div className="sticky bottom-3 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur">
            <Button type="submit" className="rounded-full" disabled={sparar || !smutsig}>
              <Save className="size-4" aria-hidden /> {sparar ? "Sparar…" : "Spara ändringar"}
            </Button>
            <p className="text-sm text-muted-foreground" role="status">{status ?? "Alla ändringar är sparade"}</p>
          </div>
        </form>
      ) : <p className="text-sm text-muted-foreground">Laddar innehåll…</p>}
    </div>
  );
}

function EnkeltFalt({ falt, varde, onAndra }: { falt: EnkelFalt; varde: unknown; onAndra: (v: unknown) => void }) {
  const id = falt.path.join("-");
  if (falt.typ === "image") {
    const formularFalt = { nyckel: "value", label: falt.label, typ: "image" as const, ...(falt.hjalp ? { hjalp: falt.hjalp } : {}) };
    return <FaltForm falt={[formularFalt]} rad={{ id, value: varde }} onAndra={(_, v) => onAndra(v)} />;
  }
  if (falt.typ === "stringList") {
    const formularFalt = { nyckel: "value", label: falt.label, typ: "stringList" as const, ...(falt.hjalp ? { hjalp: falt.hjalp } : {}) };
    return <FaltForm falt={[formularFalt]} rad={{ id, value: varde }} onAndra={(_, v) => onAndra(v)} />;
  }
  const gemensamt = { id, required: falt.krav, value: String(varde ?? ""), placeholder: falt.placeholder, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onAndra(e.target.value) };
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{falt.label}</Label>
      {falt.typ === "textarea" ? <Textarea {...gemensamt} rows={4} className="rounded-xl" /> : <Input {...gemensamt} type={falt.typ} className="rounded-xl" />}
      {falt.hjalp ? <p className="text-xs text-muted-foreground">{falt.hjalp}</p> : null}
    </div>
  );
}

function UpprepadLista({ falt, varde, onAndra }: { falt: UpprepatFalt; varde: unknown; onAndra: (v: unknown) => void }) {
  const poster = Array.isArray(varde) ? varde as Record<string, unknown>[] : [];
  const [radera, setRadera] = useState<number | null>(null);
  const uppdatera = (index: number, nyckel: string, nytt: string) => onAndra(poster.map((post, i) => i === index ? { ...post, [nyckel]: nytt } : post));
  const laggTill = () => onAndra([...poster, falt.path[0] === "offices" ? { id: `kontor-${Date.now()}` } : {}]);
  return (
    <div className="space-y-4">
      {poster.map((post, index) => (
        <div key={String(post["id"] ?? `${falt.path.join("-")}-${index}`)} className="rounded-xl border border-border p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-medium">{falt.singular.charAt(0).toUpperCase() + falt.singular.slice(1)} {index + 1}</h3>
            <Button type="button" variant="ghost" size="sm" className="rounded-full text-destructive" onClick={() => setRadera(index)} aria-label={`Ta bort ${falt.singular} ${index + 1}`}>
              <Trash2 className="size-4" aria-hidden /> Ta bort
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {falt.falt.map((del) => {
              const id = `${falt.path.join("-")}-${index}-${del.nyckel}`;
              return <div key={del.nyckel} className={del.typ === "textarea" ? "space-y-1.5 md:col-span-2" : "space-y-1.5"}>
                <Label htmlFor={id}>{del.label}</Label>
                {del.typ === "textarea" ? <Textarea id={id} required={del.krav} value={String(post[del.nyckel] ?? "")} onChange={(e) => uppdatera(index, del.nyckel, e.target.value)} className="rounded-xl" /> : <Input id={id} type={del.typ ?? "text"} required={del.krav} value={String(post[del.nyckel] ?? "")} onChange={(e) => uppdatera(index, del.nyckel, e.target.value)} className="rounded-xl" />}
              </div>;
            })}
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={laggTill}><Plus className="size-4" aria-hidden /> Lägg till {falt.singular}</Button>
      <AlertDialog open={radera !== null} onOpenChange={(open) => { if (!open) setRadera(null); }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader><AlertDialogTitle>Ta bort {falt.singular}?</AlertDialogTitle><AlertDialogDescription>Detta försvinner när du sparar ändringarna.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel className="rounded-full">Avbryt</AlertDialogCancel><AlertDialogAction className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (radera !== null) onAndra(poster.filter((_, i) => i !== radera)); setRadera(null); }}>Ta bort</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
