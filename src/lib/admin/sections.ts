/**
 * Registret över vilka sektioner adminpanelen kan redigera.
 * Fälttyperna speglar tabellkolumnerna i det egna Supabase-projektet.
 */
import { AKTUELLT_KATEGORIER } from "@/content/aktuellt";
import { FAQ_KATEGORIER } from "@/content/faq";
import { SIDOR_NYCKLAR } from "@/content/sidor";

export type FaltTyp =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "stringList"
  | "repeat";

export type Falt = {
  nyckel: string;
  label: string;
  typ: FaltTyp;
  krav?: boolean;
  alternativ?: string[];
  delFalt?: { nyckel: string; label: string; typ: "text" | "textarea" }[];
  hjalp?: string;
};

export type Sektion = {
  nyckel: string;
  namn: string;
  beskrivning: string;
  /** "tabell" = rader i en Supabase-tabell, "json" = en rad i `sidor`/`site_installningar`. */
  slag: "tabell" | "json";
  tabell?: string;
  sidnyckel?: string;
  rubrikNyckel: string;
  falt?: Falt[];
};

export const SEKTIONER: Sektion[] = [
  {
    nyckel: "aktuellt",
    namn: "Aktuellt (artiklar)",
    beskrivning: "Nyhetsflödet på sidan Aktuellt och de tre senaste artiklarna på startsidan.",
    slag: "tabell",
    tabell: "aktuellt",
    rubrikNyckel: "title",
    falt: [
      { nyckel: "title", label: "Rubrik", typ: "text", krav: true },
      {
        nyckel: "slug",
        label: "Länknamn (slug)",
        typ: "text",
        krav: true,
        hjalp: "Små bokstäver och bindestreck, t.ex. nya-regler-for-moms",
      },
      { nyckel: "excerpt", label: "Ingress", typ: "textarea", krav: true },
      { nyckel: "content", label: "Brödtext", typ: "textarea", krav: true, hjalp: "Tom rad = nytt stycke." },
      { nyckel: "image_url", label: "Bild", typ: "image" },
      { nyckel: "category", label: "Kategori", typ: "select", alternativ: [...AKTUELLT_KATEGORIER] },
      { nyckel: "published_at", label: "Publiceringsdatum", typ: "date", krav: true },
    ],
  },
  {
    nyckel: "kundreferenser",
    namn: "Kundreferenser",
    beskrivning: "Kundcitaten på referenssidan och karusellen på startsidan.",
    slag: "tabell",
    tabell: "kundreferenser",
    rubrikNyckel: "company_name",
    falt: [
      { nyckel: "client_name", label: "Kontaktperson", typ: "text", krav: true },
      { nyckel: "company_name", label: "Företag", typ: "text", krav: true },
      { nyckel: "quote", label: "Citat", typ: "textarea", krav: true },
      { nyckel: "logo_url", label: "Logotyp", typ: "image" },
      { nyckel: "is_featured", label: "Visa på startsidan", typ: "boolean" },
      { nyckel: "sort_order", label: "Ordning", typ: "number" },
    ],
  },
  {
    nyckel: "faq",
    namn: "Frågor & svar",
    beskrivning: "Frågorna på sidan Frågor & svar, grupperade per kategori.",
    slag: "tabell",
    tabell: "faq",
    rubrikNyckel: "question",
    falt: [
      { nyckel: "question", label: "Fråga", typ: "text", krav: true },
      { nyckel: "answer", label: "Svar", typ: "textarea", krav: true },
      {
        nyckel: "category",
        label: "Kategori",
        typ: "select",
        alternativ: [...FAQ_KATEGORIER],
      },
      { nyckel: "sort_order", label: "Ordning", typ: "number" },
    ],
  },
  {
    nyckel: "tjanster",
    namn: "Tjänster",
    beskrivning: "Översikten och de fyra tjänsteundersidorna – texter och bilder.",
    slag: "tabell",
    tabell: "tjanster",
    rubrikNyckel: "title",
    falt: [
      { nyckel: "title", label: "Kort titel", typ: "text", krav: true },
      { nyckel: "slug", label: "Länknamn (slug)", typ: "text", krav: true },
      { nyckel: "short", label: "Kort beskrivning (kort)", typ: "textarea" },
      { nyckel: "heading", label: "Rubrik på undersidan", typ: "text" },
      { nyckel: "intro", label: "Inledning på undersidan", typ: "textarea" },
      {
        nyckel: "bullets",
        label: "Det här ingår (punktlista)",
        typ: "stringList",
        hjalp: "En punkt per rad.",
      },
      {
        nyckel: "sections",
        label: "Textavsnitt på undersidan",
        typ: "repeat",
        delFalt: [
          { nyckel: "heading", label: "Underrubrik", typ: "text" },
          { nyckel: "body", label: "Text", typ: "textarea" },
        ],
      },
      { nyckel: "meta_title", label: "SEO-titel", typ: "text" },
      { nyckel: "meta_description", label: "SEO-beskrivning", typ: "textarea" },
      { nyckel: "image_url", label: "Bild", typ: "image" },
      { nyckel: "sort_order", label: "Ordning", typ: "number" },
    ],
  },
  {
    nyckel: "dokument",
    namn: "Dokument",
    beskrivning: "Nedladdningslistan på sidan Dokument.",
    slag: "tabell",
    tabell: "dokument",
    rubrikNyckel: "title",
    falt: [
      { nyckel: "title", label: "Titel", typ: "text", krav: true },
      { nyckel: "description", label: "Beskrivning", typ: "textarea" },
      { nyckel: "category", label: "Kategori", typ: "text", krav: true },
      { nyckel: "href", label: "Fil-URL", typ: "text", hjalp: "Kopplas till Supabase Storage senare." },
      { nyckel: "sort_order", label: "Ordning", typ: "number" },
    ],
  },
  {
    nyckel: "sidor",
    namn: "Sidtexter",
    beskrivning: "Rubriker, inledningar och bilder på webbplatsens olika sidor.",
    slag: "json",
    sidnyckel: "sidor",
    rubrikNyckel: "page",
  },
  {
    nyckel: "site",
    namn: "Företagsuppgifter",
    beskrivning: "Telefon, e-post, organisationsnummer, kontor och gemensamma kontakttexter.",
    slag: "json",
    sidnyckel: "site",
    rubrikNyckel: "key",
  },
];

export const hittaSektion = (nyckel: string) => SEKTIONER.find((s) => s.nyckel === nyckel);
