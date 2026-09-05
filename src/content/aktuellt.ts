/**
 * Speglar den kommande Supabase-tabellen `aktuellt`.
 * Byt endast ut hämtningsfunktionerna i src/lib/content/aktuellt.ts när databasen kopplas.
 */
export type Artikel = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  published_at: string;
  created_at: string;
};

export const AKTUELLT_KATEGORIER = ["Skattenyheter", "Kontorsnytt", "Lediga tjänster"] as const;

export const aktuellt: Artikel[] = [
  {
    id: "1",
    title: "Nya regler för moms vid fakturering – så påverkas ditt företag",
    slug: "nya-regler-for-moms-vid-fakturering",
    excerpt:
      "Momsreglerna justeras löpande och det påverkar hur du fakturerar. Vi går igenom vad du behöver hålla koll på i din löpande bokföring.",
    content:
      "Momsreglerna justeras löpande och det påverkar hur du fakturerar dina kunder.\n\nFör de flesta små och medelstora företag i Jämtland handlar det framför allt om tre saker: att fakturan innehåller alla obligatoriska uppgifter, att rätt momssats används och att redovisningsperioden stämmer med det som är registrerat hos Skatteverket.\n\nVi rekommenderar att du går igenom din fakturamall en gång per år. Saknas uppgifter kan avdragsrätten för din kund ifrågasättas, och då landar frågan ofta tillbaka hos dig.\n\nÄr du osäker på vad som gäller för just din verksamhet är du välkommen att kontakta oss i Strömsund eller Östersund. Vi går igenom underlagen tillsammans och ser till att den löpande bokföringen blir rätt från början.",
    image_url: "/images/aktuellt-moms.jpg",
    category: "Skattenyheter",
    published_at: "2026-08-21",
    created_at: "2026-08-21",
  },
  {
    id: "2",
    title: "Dags att planera inför bokslutet – vår checklista",
    slug: "dags-att-planera-infor-bokslutet",
    excerpt:
      "Ett bra bokslut börjar långt före räkenskapsårets slut. Här är de punkter vi går igenom med våra kunder inför årsredovisningen.",
    content:
      "Ett bra bokslut börjar långt före räkenskapsårets slut.\n\nVi brukar sätta av ett möte några månader innan bokslutsdatum för att gå igenom lagervärdering, kundfordringar, periodiseringar och planerade investeringar. Då finns det fortfarande tid att fatta beslut som påverkar resultatet.\n\nDen som väntar till efter räkenskapsårets slut har färre valmöjligheter kvar. Skatteplanering handlar sällan om avancerade upplägg, utan om att fatta rätt beslut i rätt tid.\n\nKontakta din redovisningskonsult hos oss för att boka ett planeringsmöte inför årsredovisningen.",
    image_url: "/images/aktuellt-bokslut.jpg",
    category: "Skattenyheter",
    published_at: "2026-07-04",
    created_at: "2026-07-04",
  },
  {
    id: "3",
    title: "Vi växer i Östersund – nytt kontor med plats för fler",
    slug: "vi-vaxer-i-ostersund",
    excerpt:
      "Efterfrågan på kvalificerad redovisning i Jämtland ökar. Nu utökar vi vårt kontor i Östersund för att komma närmare våra kunder.",
    content:
      "Efterfrågan på kvalificerad redovisning i Jämtland ökar och därför utökar vi vårt kontor i Östersund.\n\nMed fler arbetsplatser kan vi ta emot kunder på plats, hålla genomgångar av bokslut i lugn och ro och samtidigt behålla den personliga kontakt som är själva grunden i vårt arbete.\n\nVårt kontor i Strömsund fortsätter precis som tidigare. Många av våra kunder har verksamhet i båda kommunerna, och för oss är det en styrka att finnas nära på flera platser.\n\nVälkommen in på en kaffe nästa gång du är i stan.",
    image_url: "/images/aktuellt-kontor.jpg",
    category: "Kontorsnytt",
    published_at: "2026-06-12",
    created_at: "2026-06-12",
  },
  {
    id: "4",
    title: "Vi söker en redovisningskonsult till Strömsund",
    slug: "vi-soker-redovisningskonsult-stromsund",
    excerpt:
      "Vill du arbeta nära kunden med hela bredden av redovisning? Vi utökar teamet på vårt kontor i Strömsund.",
    content:
      "Vi utökar teamet på vårt kontor i Strömsund och söker dig som vill arbeta nära kunden med hela bredden av redovisning.\n\nHos oss får du eget kundansvar, kollegor som gärna delar kunskap och möjlighet att utvecklas mot auktorisation. Du arbetar med löpande bokföring, bokslut, deklarationer och rådgivning.\n\nVi tror att du har erfarenhet från byrå eller ekonomiavdelning, är strukturerad och tycker om kontakten med företagare.\n\nSkicka din ansökan till oss – vi läser ansökningar löpande.",
    image_url: "/images/aktuellt-jobb.jpg",
    category: "Lediga tjänster",
    published_at: "2026-05-28",
    created_at: "2026-05-28",
  },
  {
    id: "5",
    title: "Digitala löner – så förenklar du lönehanteringen",
    slug: "digitala-loner-forenkla-lonehanteringen",
    excerpt:
      "Från tidrapport till lönespecifikation och arbetsgivardeklaration. Så ser ett digitalt löneflöde ut i praktiken.",
    content:
      "Lönehantering är ett av de områden där digitala flöden gör allra störst skillnad.\n\nMed digital tidrapportering, automatiska lönespecifikationer och rapportering av arbetsgivardeklaration på individnivå minskar både tidsåtgången och risken för fel. Dina medarbetare får sin lönespecifikation direkt i mobilen.\n\nVi tar hand om hela kedjan, eller de delar du vill lämna ifrån dig. Semesterberäkningar, reseräkningar, förmåner och rapportering till Skatteverket ingår i uppdraget.\n\nVill du veta hur ett digitalt löneflöde skulle se ut hos er? Boka ett möte med oss.",
    image_url: "/images/aktuellt-loner.jpg",
    category: "Skattenyheter",
    published_at: "2026-04-15",
    created_at: "2026-04-15",
  },
  {
    id: "6",
    title: "Tack för förtroendet – Sveriges nöjdaste kunder",
    slug: "tack-for-fortroendet",
    excerpt:
      "Våra kunder har svarat och vi är stolta över resultatet. Här berättar vi vad vi tar med oss framåt.",
    content:
      "Våra kunder har svarat i den årliga kundundersökningen och vi är stolta över resultatet.\n\nDet som lyfts fram tydligast är tillgängligheten: att det går att ringa och få svar av någon som känner företaget. Det är precis den ambitionen vi har på båda våra kontor.\n\nVi tar också med oss förbättringsförslagen. Flera kunder vill ha ännu tydligare återkoppling under året, inte bara vid bokslutet, och det arbetar vi vidare med.\n\nStort tack till alla som tog sig tid att svara.",
    image_url: "/images/aktuellt-kunder.jpg",
    category: "Kontorsnytt",
    published_at: "2026-03-02",
    created_at: "2026-03-02",
  },
];
