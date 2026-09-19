export type Dokument = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  sort_order?: number;
};

export const dokument: Dokument[] = [
  {
    id: "1",
    title: "Checklista inför bokslut",
    description: "Punkterna vi går igenom tillsammans före räkenskapsårets slut.",
    category: "Checklistor",
    href: "#",
  },
  {
    id: "2",
    title: "Checklista ny kund",
    description: "Underlag och behörigheter vi behöver vid uppstart av uppdraget.",
    category: "Checklistor",
    href: "#",
  },
  {
    id: "3",
    title: "Blankett – anställningsuppgifter",
    description: "Fylls i vid nyanställning inför första löneutbetalningen.",
    category: "Blanketter",
    href: "#",
  },
  {
    id: "4",
    title: "Blankett – reseräkning",
    description: "För redovisning av resor, traktamente och utlägg.",
    category: "Blanketter",
    href: "#",
  },
  {
    id: "5",
    title: "Integritetspolicy (PDF)",
    description: "Så behandlar vi personuppgifter i våra uppdrag.",
    category: "Villkor & policyer",
    href: "#",
  },
  {
    id: "6",
    title: "Allmänna villkor för uppdrag",
    description: "Villkoren som gäller för våra redovisningsuppdrag.",
    category: "Villkor & policyer",
    href: "#",
  },
];
