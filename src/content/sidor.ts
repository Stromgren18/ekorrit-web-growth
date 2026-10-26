/**
 * Sidinnehåll för alla undersidor – speglar tabellen `sidor`
 * (kolumn: page, content jsonb). Dessa värden är standardvärden som
 * adminpanelen kan skriva över.
 */

export type HeroSida = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
};

export type HemSida = HeroSida & {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  tjanster: { eyebrow: string; title: string; intro: string };
  referenser: { eyebrow: string; title: string };
  aktuellt: { eyebrow: string; title: string };
};

export type OmOssSida = {
  hero: { eyebrow: string; title: string; intro: string };
  bild: { url: string; alt: string };
  body: { title: string; stycken: string[] };
  nyckeltal: { label: string; varde: string }[];
  varderingar: { title: string; body: string }[];
};

export const SIDOR: Record<string, Record<string, unknown>> = {
  hem: {
    hero: {
      eyebrow: "Personlig redovisning med jämtländska rötter",
      title: "Vi kan ekonomi – räkna med oss",
      subtitle:
        "Hos oss vet du vem du pratar med. Fem auktoriserade redovisningskonsulter lär känna ditt företag och blir ett tryggt ekonomiskt bollplank – i Jämtland eller digitalt i hela Sverige.",
      image: "/images/hero-team.jpg",
      imageAlt: "Ekorrits medarbetare samlade kring ett bord med utsikt över sjö och snötäckta fjäll",
    },
    tjanster: {
      eyebrow: "Våra tjänster",
      title: "Mer än en redovisningsbyrå",
      intro:
        "Bra redovisning visar inte bara vad som har hänt. Med löpande bokföring, bokslut, löneadministration, budget och rådgivning hjälper vi dig också att planera framåt och fatta bättre beslut.",
    },
    referenser: { eyebrow: "Kundreferenser", title: "Vad våra kunder säger" },
    aktuellt: { eyebrow: "Aktuellt", title: "Senaste nytt från byrån" },
  },
  "om-oss": {
    hero: {
      eyebrow: "Om oss",
      title: "Personligt, tryggt och okomplicerat",
      intro:
        "Som privatägd och lokalt förankrad redovisningsbyrå erbjuder vi personlig kontakt, kontinuitet och ett långsiktigt samarbete.",
    },
    bild: {
      url: "/images/aktuellt-mote.jpg",
      alt: "Rådgivningsmöte mellan redovisningskonsult och företagare",
    },
    body: {
      title: "Här vet du vem du pratar med",
      stycken: [
        "Hos Ekorrit finns fem auktoriserade redovisningskonsulter. Du får möjlighet att bygga en relation med människor som lär känna ditt företag och din verksamhet, i stället för att möta en ny handläggare från gång till gång.",
        "Huvudkontoret finns i Strömsund och i Östersund har vi ett obemannat lokalkontor. Digitala möten gör att vi kan vara den personliga jämtländska redovisningsbyrån även för företag i andra delar av Sverige – med ett norrländskt lugn i samarbetet.",
      ],
    },
    nyckeltal: [
      { label: "Auktoriserade konsulter", varde: "5" },
      { label: "Kvalitetsledning", varde: "ISO 9001" },
    ],
    varderingar: [
      {
        title: "Personlig kontinuitet",
        body: "Du vet vem du pratar med och bygger en långsiktig relation med människor som lär känna ditt företag och din vardag.",
      },
      {
        title: "Auktoriserad kompetens",
        body: "Fem auktoriserade redovisningskonsulter ger dig trygg, kvalitetssäkrad hjälp enligt ISO 9001 och Srf Konsulternas regelverk.",
      },
      {
        title: "Ett ekonomiskt bollplank",
        body: "Vi redovisar inte bara det som har hänt. Du får stöd att planera framåt, fatta bättre beslut och skapa lönsamhet.",
      },
    ],
  },
  tjanster: {
    hero: {
      eyebrow: "Tjänster",
      title: "Redovisning som hjälper dig framåt",
      intro:
        "Välj de delar du vill lämna ifrån dig – eller låt oss ta hand om hela ekonomifunktionen. Du får en personlig kontakt som lär känna ditt företag och hjälper dig att använda siffrorna för bättre beslut.",
    },
  },
  kundreferenser: {
    hero: {
      eyebrow: "Kundreferenser",
      title: "Långsiktiga relationer med våra kunder",
      intro:
        "När vi lär känna företaget kan vi bidra med mer än bokföring. Här berättar några kunder om samarbetet med Ekorrit.",
    },
  },
  medarbetare: {
    hero: {
      eyebrow: "Möt teamet",
      title: "Människorna bakom Ekorrit",
      intro:
        "Hos oss får du en personlig kontakt som lär känna både dig och ditt företag. Här möter du teamet som hjälper våra kunder med redovisning, lön och rådgivning.",
    },
  },
  faq: {
    hero: {
      eyebrow: "Frågor & svar",
      title: "Vanliga frågor om redovisning och bokföring",
      intro: "Hittar du inte svaret här? Ring oss eller skicka ett meddelande – vi svarar gärna.",
    },
  },
  aktuellt: {
    hero: {
      eyebrow: "Aktuellt",
      title: "Kunskap för bättre ekonomiska beslut",
      intro:
        "Aktuellt om skatt, bokslut, budget, löner och sådant som hjälper dig att planera företagets ekonomi framåt.",
    },
  },
  dokument: {
    hero: {
      eyebrow: "Dokument",
      title: "Blanketter och checklistor",
      intro:
        "Här samlar vi de dokument våra kunder använder oftast. Saknar du något? Hör av dig, vi skickar det direkt.",
    },
  },
  kontakt: {
    hero: {
      eyebrow: "Kontakt",
      title: "Vi lär gärna känna ditt företag",
      intro:
        "Ring, mejla eller skicka ett meddelande. Vi träffas på huvudkontoret i Strömsund eller digitalt, och i Östersund efter överenskommelse.",
    },
  },
};

/** Alla sidnycklar som ska finnas som rader i tabellen `sidor`. */
export const SIDOR_NYCKLAR = Object.keys(SIDOR);
