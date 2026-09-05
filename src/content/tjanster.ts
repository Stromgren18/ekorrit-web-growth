export type Tjanst = {
  slug: string;
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
};

export const tjanster: Tjanst[] = [
  {
    slug: "bokforing",
    title: "Bokföring",
    short:
      "Löpande bokföring, momsredovisning och avstämningar – med digitala flöden som sparar tid varje månad.",
    metaTitle: "Bokföring Östersund & Strömsund | Ekorrit AB",
    metaDescription:
      "Löpande bokföring, momsredovisning och avstämningar av auktoriserad redovisningsbyrå i Strömsund och Östersund. Digitala flöden och personlig kontakt.",
    heading: "Bokföring i Östersund och Strömsund",
    intro:
      "Vi sköter den löpande bokföringen så att du kan lägga tiden på verksamheten. Du får ordning på siffrorna, koll på momsen och en redovisningskonsult som känner ditt bolag.",
    sections: [
      {
        heading: "Löpande redovisning varje månad",
        body: "Vi bokför leverantörsfakturor, kundfakturor, kvitton och banktransaktioner löpande och stämmer av balanskonton. Du får en resultatrapport som går att lita på, inte bara en gång om året utan under hela räkenskapsåret.",
      },
      {
        heading: "Moms och skattedeklarationer",
        body: "Momsredovisning, arbetsgivardeklaration och periodisk sammanställning lämnas in i rätt tid. Vi håller koll på datum och regler så att du slipper förseningsavgifter.",
      },
      {
        heading: "Digitalt flöde från start",
        body: "Vi sätter upp ett digitalt underlagsflöde tillsammans med dig: fakturor direkt in i systemet och kvitton via app. Det ger snabbare rapporter och lägre kostnad över tid.",
      },
    ],
    bullets: [
      "Löpande bokföring och avstämningar",
      "Moms- och skattedeklarationer",
      "Kund- och leverantörsreskontra",
      "Månads- och periodrapporter",
      "Fakturering och betalningsbevakning",
    ],
  },
  {
    slug: "arsredovisning-bokslut",
    title: "Årsredovisning & Bokslut",
    short:
      "Bokslut, årsredovisning och deklaration enligt gällande regelverk – med genomgång av resultatet tillsammans med dig.",
    metaTitle: "Årsredovisning Jämtland & bokslut | Ekorrit AB",
    metaDescription:
      "Årsredovisning i Jämtland: bokslut, noter, inkomstdeklaration och inlämning till Bolagsverket. Auktoriserad redovisningskonsult i Strömsund och Östersund.",
    heading: "Årsredovisning i Jämtland – bokslut du kan lita på",
    intro:
      "Vi upprättar bokslut och årsredovisning enligt gällande regelverk, tar fram inkomstdeklarationen och går igenom resultatet med dig innan allt lämnas in.",
    sections: [
      {
        heading: "Bokslut och årsredovisning",
        body: "Vi periodiserar, värderar lager och anläggningstillgångar, upprättar noter och förvaltningsberättelse samt lämnar in årsredovisningen till Bolagsverket i tid.",
      },
      {
        heading: "Inkomstdeklaration",
        body: "Bolagets deklaration och bilagor upprättas i samband med bokslutet. Vi hanterar även delägarnas K10-blanketter och beräkning av utdelningsutrymme.",
      },
      {
        heading: "Planering i god tid",
        body: "Ett bokslutsmöte några månader före räkenskapsårets slut ger utrymme att fatta beslut om löneuttag, avsättningar och investeringar medan de fortfarande påverkar resultatet.",
      },
    ],
    bullets: [
      "Bokslut för aktiebolag, handelsbolag och enskild firma",
      "Årsredovisning enligt K2 och K3",
      "Inkomstdeklaration och bilagor",
      "K10 och utdelningsberäkning",
      "Genomgång av resultatet med din konsult",
    ],
  },
  {
    slug: "lonehantering",
    title: "Lönehantering",
    short:
      "Löner, lönespecifikationer, semester och arbetsgivardeklaration – rätt belopp i rätt tid, varje månad.",
    metaTitle: "Lönehantering i Strömsund & Östersund | Ekorrit AB",
    metaDescription:
      "Outsourca lönehanteringen till Ekorrit AB. Löneberäkning, lönespecifikationer, semester, förmåner och arbetsgivardeklaration på individnivå.",
    heading: "Lönehantering utan administrativt krångel",
    intro:
      "Löner ska bara fungera. Vi tar hand om hela löneprocessen – eller de delar du vill lämna ifrån dig – och håller reda på regler, avtal och rapportering.",
    sections: [
      {
        heading: "Hela löneprocessen",
        body: "Från tidrapport till utbetalningsfil: löneberäkning, lönespecifikationer digitalt till medarbetarna, semesterberäkning, reseräkningar och förmåner.",
      },
      {
        heading: "Rapportering och avtal",
        body: "Arbetsgivardeklaration på individnivå, kontrolluppgifter, rapportering till kollektivavtalsparter och statistikuppgifter sköts inom uppdraget.",
      },
      {
        heading: "Stöd i arbetsgivarfrågor",
        body: "Vi svarar på frågor om sjuklön, föräldraledighet, semesterlagen och anställningsformer, och hjälper dig att göra rätt från början.",
      },
    ],
    bullets: [
      "Löneberäkning och lönespecifikationer",
      "Semester-, sjuk- och frånvarohantering",
      "Reseräkningar och förmåner",
      "Arbetsgivardeklaration på individnivå",
      "Rapportering till avtalsparter",
    ],
  },
  {
    slug: "radgivning",
    title: "Kvalificerad Rådgivning",
    short:
      "Skatt, ägarfrågor, likviditet och tillväxt – rådgivning från auktoriserad redovisningskonsult som kan ditt bolag.",
    metaTitle: "Auktoriserad redovisningskonsult – rådgivning | Ekorrit AB",
    metaDescription:
      "Kvalificerad ekonomisk rådgivning av auktoriserad redovisningskonsult i Strömsund och Östersund. Skatt, ägarfrågor, budget, likviditet och tillväxt.",
    heading: "Kvalificerad rådgivning av auktoriserad redovisningskonsult",
    intro:
      "När besluten är större än den löpande bokföringen behövs någon som ser hela bilden. Vi finns med som bollplank i frågor om skatt, ägande, finansiering och tillväxt.",
    sections: [
      {
        heading: "Skatt och ägarfrågor",
        body: "Löneuttag kontra utdelning, fåmansföretagsreglerna, generationsskifte, köp och försäljning av bolag samt omstruktureringar – vi går igenom konsekvenserna innan du beslutar.",
      },
      {
        heading: "Budget, prognos och likviditet",
        body: "Vi bygger budget och likviditetsprognos utifrån din verksamhet och följer upp mot utfallet, så att du ser i tid var det behöver justeras.",
      },
      {
        heading: "Bollplank i vardagen",
        body: "Ska du anställa, investera eller lägga ett anbud? Ring din konsult. Ofta räcker ett kort samtal för att undvika ett dyrt misstag.",
      },
    ],
    bullets: [
      "Skatterådgivning för bolag och ägare",
      "Budget, prognos och likviditetsplanering",
      "Företagsöverlåtelser och generationsskifte",
      "Underlag till bank och finansiärer",
      "Löpande bollplank via telefon och möte",
    ],
  },
];

export const getTjanst = (slug: string) => tjanster.find((t) => t.slug === slug);
