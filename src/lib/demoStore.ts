/**
 * Lokalt demoläge: mutable lager som adminpanelen redigerar när Supabase
 * inte är kopplat. Speglar tabellerna aktuellt, kundreferenser, faq,
 * tjanster, dokument, sidor och site_installningar.
 */
import { aktuellt as aktuelltSeed } from "@/content/aktuellt";
import { dokument as dokumentSeed } from "@/content/dokument";
import { faq as faqSeed } from "@/content/faq";
import { kundreferenser as kundreferenserSeed } from "@/content/kundreferenser";
import { medarbetare as medarbetareSeed } from "@/content/medarbetare";
import { tjanster as tjansterSeed } from "@/content/tjanster";
import { SIDOR } from "@/content/sidor";
import { certifications, site as siteSeed } from "@/content/site";

export type Office = {
  id: string;
  city: string;
  role: string;
  street: string;
  postal: string;
  phone: string;
  email: string;
};

export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  orgNumber: string;
  social: { instagram: string; facebook: string };
  offices: Office[];
  certifications: { name: string; note: string }[];
  cta: { title: string; body: string };
};

export const demoStore: {
  aktuellt: typeof aktuelltSeed;
  kundreferenser: typeof kundreferenserSeed;
  medarbetare: typeof medarbetareSeed;
  faq: typeof faqSeed;
  tjanster: typeof tjansterSeed;
  dokument: typeof dokumentSeed;
  sidor: Record<string, Record<string, unknown>>;
  site: SiteContent;
} = {
  aktuellt: [...aktuelltSeed],
  kundreferenser: kundreferenserSeed.map((k) => ({ ...k })),
  medarbetare: medarbetareSeed.map((m) => ({ ...m })),
  faq: faqSeed.map((f) => ({ ...f })),
  tjanster: tjansterSeed.map((t) => ({ ...t })),
  dokument: dokumentSeed.map((d) => ({ ...d })),
  sidor: Object.fromEntries(Object.entries(SIDOR).map(([k, v]) => [k, structuredClone(v)])),
  site: {
    name: siteSeed.name,
    tagline: siteSeed.tagline,
    description: siteSeed.description,
    phone: siteSeed.phone,
    email: siteSeed.email,
    orgNumber: siteSeed.orgNumber,
    social: { ...siteSeed.social },
    offices: siteSeed.offices.map((o) => ({ ...o, id: o.id as string })),
    certifications: certifications.map((c) => ({ ...c })),
    cta: {
      title: "Låt oss bli ditt ekonomiska bollplank",
      body: "Vi träffas på huvudkontoret i Strömsund eller digitalt, oavsett var i Sverige ditt företag finns. Första samtalet är alltid förutsättningslöst.",
    },
  },
};

/** Slår ihop sparat innehåll med standardvärdena så saknade nycklar inte kraschar. */
export function slaaIhonDefaults<T>(page: string, fallback: T): T {
  return { ...(fallback as object), ...(demoStore.sidor[page] ?? {}) } as T;
}
