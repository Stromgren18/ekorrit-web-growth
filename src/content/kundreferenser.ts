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
};

export const kundreferenser: Kundreferens[] = [
  {
    id: "1",
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
