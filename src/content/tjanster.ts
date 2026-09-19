export type Tjanst = {
  slug: string;
  title: string;
  short: string;
  meta_title: string;
  meta_description: string;
  heading: string;
  intro: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
  image_url?: string;
  sort_order?: number;
};

export const tjanster: Tjanst[] = [
  {
    slug: "bokforing",
    title: "Bokföring",
    short:
      "Löpande bokföring, moms och avstämningar med en personlig kontakt som ser helheten och hjälper dig framåt.",
    metaTitle: "Personlig bokföring i Jämtland och hela Sverige | Ekorrit",
    metaDescription:
      "Löpande bokföring, moms och rapporter med personlig kontakt. Ekorrit hjälper företag i Jämtland och hela Sverige med digitala flöden.",
    heading: "Personlig bokföring – nära dig även på distans",
    intro:
      "Vi sköter den löpande bokföringen så att du kan lägga tiden på verksamheten. Du får ordning på siffrorna och en redovisningskonsult som lär känna ditt företag, oavsett var i Sverige du finns.",
    sections: [
      {
        heading: "Löpande redovisning varje månad",
        body: "Vi bokför leverantörsfakturor, kundfakturor, kvitton och banktransaktioner löpande och stämmer av balanskonton. Tydliga rapporter under året gör siffrorna användbara när du ska planera och fatta beslut.",
      },
      {
        heading: "Moms och skattedeklarationer",
        body: "Momsredovisning, arbetsgivardeklaration och periodisk sammanställning lämnas in i rätt tid. Vi håller koll på datum och regler så att du slipper förseningsavgifter.",
      },
      {
        heading: "Digitalt flöde från start",
        body: "Vi sätter upp ett digitalt underlagsflöde tillsammans med dig: fakturor direkt in i systemet och kvitton via app. Det ger snabbare rapporter och gör det enkelt att samarbeta personligt även på distans.",
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
      "Bokslut, årsredovisning och deklaration – med en personlig genomgång som också hjälper dig att blicka framåt.",
    metaTitle: "Årsredovisning Jämtland & bokslut | Ekorrit AB",
    metaDescription:
      "Årsredovisning och bokslut med personlig genomgång. Ekorrit hjälper företag i Jämtland och hela Sverige att förstå resultatet och planera framåt.",
    heading: "Årsredovisning i Jämtland – bokslut du kan lita på",
    intro:
      "Vi upprättar bokslut och årsredovisning, tar fram inkomstdeklarationen och går igenom resultatet med dig. Tillsammans ser vi också vad siffrorna betyder för året som kommer.",
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
      "Trygg löneadministration med kontinuitet – rätt belopp, rätt rapportering och samma personliga kontakt varje månad.",
    metaTitle: "Personlig lönehantering för företag | Ekorrit AB",
    metaDescription:
      "Outsourca lönehanteringen till Ekorrit AB. Löneberäkning, lönespecifikationer, semester, förmåner och arbetsgivardeklaration på individnivå.",
    heading: "Lönehantering utan administrativt krångel",
    intro:
      "Löner ska bara fungera. Vi tar hand om hela löneprocessen – eller de delar du vill lämna ifrån dig – med en kontakt som känner företaget, medarbetarna och era rutiner.",
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
      "Budget, skatt, likviditet och tillväxt – ett ekonomiskt bollplank som känner ditt företag och ser framåt.",
    metaTitle: "Auktoriserad redovisningskonsult – rådgivning | Ekorrit AB",
    metaDescription:
      "Personlig ekonomisk rådgivning för företag i hela Sverige. Få stöd med budget, skatt, ägarfrågor, likviditet och tillväxt från Ekorrit.",
    heading: "Kvalificerad rådgivning av auktoriserad redovisningskonsult",
    intro:
      "Bra redovisning handlar inte bara om det som redan har hänt. Som ditt ekonomiska bollplank hjälper vi dig att använda siffrorna för att planera, fatta bättre beslut och skapa förutsättningar för lönsamhet.",
    sections: [
      {
        heading: "Skatt och ägarfrågor",
        body: "Löneuttag kontra utdelning, fåmansföretagsreglerna, generationsskifte, köp och försäljning av bolag samt omstruktureringar – vi går igenom konsekvenserna innan du beslutar.",
      },
      {
        heading: "Budget, prognos och likviditet",
        body: "Vi bygger budget och likviditetsprognos utifrån din verksamhet och följer upp mot utfallet. Inför ett nytt verksamhetsår får du ett tydligt underlag för prioriteringar och beslut.",
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
