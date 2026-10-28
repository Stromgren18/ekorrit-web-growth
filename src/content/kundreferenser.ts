import byggBild from "@/assets/case-bygg.jpg";
import akeriBild from "@/assets/case-akeri.jpg";
import installationBild from "@/assets/case-installation.jpg";

/** Speglar den kommande Supabase-tabellen `kundreferenser`. */
export type Kundreferens = {
  id: string;
  client_name: string;
  company_name: string;
  quote: string;
  logo_url: string | null;
  is_featured: boolean;
  sort_order?: number;
  created_at: string;
  /** Kundcase – valfria tills SQL-filen kundcase.sql körts. */
  slug?: string | null;
  industry?: string | null;
  location?: string | null;
  excerpt?: string | null;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  image_url?: string | null;
  services?: string[] | null;
};

export function caseSlug(ref: Pick<Kundreferens, "slug" | "company_name">): string {
  if (ref.slug) return ref.slug;
  return ref.company_name
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/&/g, "och")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const kundreferenser: Kundreferens[] = [
  {
    id: "1",
    slug: "lindgrens-bygg",
    image_url: byggBild,
    industry: "Bygg & entreprenad",
    location: "Strömsund",
    excerpt: "Exempelcase: Ett växande byggföretag fick ordning på projektredovisning och löner – och ett bollplank inför varje anbud.",
    challenge: "Bolaget hade vuxit från tre till tolv anställda på två år. Bokföringen sköttes på kvällstid, projektens lönsamhet var svår att följa och lönerna med ob-tillägg och traktamenten tog flera dagar varje månad.",
    solution: "Vi tog över löpande bokföring och lönehantering, satte upp digitala flöden för leverantörsfakturor och kvitton och införde en enkel månadsrapport per projekt. En fast kontaktperson går igenom siffrorna med Anna varje kvartal.",
    result: "Lönerna är klara på en dag, projektens marginaler syns varje månad och Anna lägger tiden på kunder och anbud i stället för pärmar.",
    services: ["Bokföring", "Lönehantering", "Rådgivning"],
    client_name: "Anna Lindgren",
    company_name: "Lindgrens Bygg & Entreprenad AB",
    quote:
      "Vi lämnade över bokföringen och lönehanteringen och fick samtidigt ett bollplank som förstår hur ett byggföretag faktiskt fungerar.",
    logo_url: null,
    is_featured: true,
    created_at: "2026-05-02",
  },
  {
    id: "2",
    slug: "sundins-akeri",
    image_url: akeriBild,
    industry: "Transport & åkeri",
    location: "Strömsund",
    excerpt: "Exempelcase: Ett familjeåkeri fick snabba svar, koll på likviditeten och ett tryggt bokslut.",
    challenge: "Höga bränslekostnader och stora fordonsinvesteringar gjorde likviditeten svårplanerad. Mikael saknade någon att snabbt stämma av med inför beslut.",
    solution: "Vi sköter bokföring, moms och bokslut och tar fram en likviditetsprognos inför varje fordonsköp. Mikael ringer direkt till sin konsult när frågor dyker upp.",
    result: "Investeringar planeras med underlag i stället för magkänsla, och bokslutet är klart i god tid varje år.",
    services: ["Bokföring", "Årsredovisning & bokslut", "Rådgivning"],
    client_name: "Mikael Sundin",
    company_name: "Sundins Åkeri",
    quote:
      "Det bästa är tillgängligheten. Jag ringer, får svar direkt av någon som känner mitt bolag och kan gå vidare med dagen.",
    logo_url: null,
    is_featured: true,
    created_at: "2026-04-18",
  },
  {
    id: "3",
    slug: "fjallkraft-installation",
    image_url: installationBild,
    industry: "Installation & service",
    location: "Östersund",
    excerpt: "Exempelcase: Ett installationsföretag använde bokslutet som startpunkt för en tydlig plan framåt.",
    challenge: "Bolaget gick bra men ägarna saknade en bild av vilka tjänster som faktiskt bar lönsamheten, och skatteplaneringen gjordes i sista minuten.",
    solution: "I samband med bokslutet gick vi igenom resultatet per affärsområde, föreslog en utdelnings- och lönestrategi och satte upp en enkel budget för nästa år.",
    result: "Ägarna fick ett konkret beslutsunderlag, en bättre skattesituation och en budget de följer upp tillsammans med oss varje halvår.",
    services: ["Årsredovisning & bokslut", "Rådgivning"],
    client_name: "Karin Ohlsson",
    company_name: "Fjällkraft Installation AB",
    quote:
      "Vi pratar inte bara om året som gått. Inför bokslutet fick vi konkreta råd som hjälpte oss att planera framåt och gjorde verklig skillnad.",
    logo_url: null,
    is_featured: true,
    created_at: "2026-03-27",
  },
  {
    id: "4",
    client_name: "Johan Persson",
    company_name: "Strömsunds Trä & Interiör",
    quote:
      "Vi gick från pappershögar till ett digitalt flöde på några veckor. Nu ser jag hur bolaget går utan att behöva vänta på månadsskiftet.",
    logo_url: null,
    is_featured: false,
    created_at: "2026-02-14",
  },
  {
    id: "5",
    client_name: "Elin Nyberg",
    company_name: "Nybergs Vård & Omsorg AB",
    quote:
      "Lönerna kommer rätt varje månad och jag slipper hålla reda på regler kring semester och förmåner. Det ger mig tid till verksamheten.",
    logo_url: null,
    is_featured: false,
    created_at: "2026-01-30",
  },
  {
    id: "6",
    client_name: "Peter Åberg",
    company_name: "Åbergs Konsult & Handel",
    quote:
      "Som ensamföretagare vill jag ha en byrå som förklarar utan krångel. Jag får raka svar från människor som känner mitt företag och känner mig aldrig som en liten kund.",
    logo_url: null,
    is_featured: false,
    created_at: "2025-12-08",
  },
];
