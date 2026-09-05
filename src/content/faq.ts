/** Speglar den kommande Supabase-tabellen `faq`. */
export type FaqPost = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
};

export const FAQ_KATEGORIER = ["Bli kund", "Bokföring & Löner", "Årsbokslut"] as const;

export const faq: FaqPost[] = [
  {
    id: "1",
    question: "Hur blir jag kund hos er?",
    answer:
      "Du hör av dig via formuläret eller telefon, och vi bokar ett förutsättningslöst möte på huvudkontoret i Strömsund eller digitalt. Besök på vårt obemannade lokalkontor i Östersund sker efter överenskommelse. Vi går igenom verksamheten och lämnar sedan en tydlig uppdragsbeskrivning.",
    category: "Bli kund",
    sort_order: 1,
  },
  {
    id: "2",
    question: "Vad kostar det att anlita en redovisningsbyrå?",
    answer:
      "Priset beror på omfattningen: antal verifikationer, antal anställda och hur digitalt ert underlag är. Vi lämnar alltid en uppskattning innan uppdraget startar så att du vet vad du kan räkna med. Många kunder väljer ett fast månadspris för den löpande redovisningen och löpande pris för rådgivning.",
    category: "Bli kund",
    sort_order: 2,
  },
  {
    id: "3",
    question: "Kan jag byta byrå mitt under räkenskapsåret?",
    answer:
      "Ja, det går utmärkt. Vi hämtar in bokföringen från din tidigare byrå, stämmer av balanserna och tar över där den slutade. I praktiken sköter vi det mesta av kontakten så att du slipper administrationen.",
    category: "Bli kund",
    sort_order: 3,
  },
  {
    id: "4",
    question: "Kan ni hjälpa företag i hela Sverige?",
    answer:
      "Ja. Ekorrit har sitt huvudkontor i Strömsund och ett obemannat lokalkontor i Östersund, men digitala underlag och möten gör att vi kan arbeta personligt med företag i hela Sverige.",
    category: "Bli kund",
    sort_order: 4,
  },
  {
    id: "5",
    question: "Vilket bokföringsprogram använder ni?",
    answer:
      "Vi arbetar i de vanligaste molnbaserade systemen på marknaden och anpassar oss efter det du redan använder när det är möjligt. Har du inget system idag hjälper vi dig att välja ett som passar verksamhetens storlek.",
    category: "Bokföring & Löner",
    sort_order: 5,
  },
  {
    id: "6",
    question: "Hur skickar jag in mina underlag?",
    answer:
      "Enklast är att leverantörsfakturor skickas digitalt direkt till systemet och att kvitton fotograferas i appen. Vi sätter upp flödet tillsammans vid uppstarten. Pappersunderlag går också bra, men det digitala sparar tid för alla.",
    category: "Bokföring & Löner",
    sort_order: 6,
  },
  {
    id: "7",
    question: "När senast behöver ni underlagen för momsredovisningen?",
    answer:
      "Vi kommer överens om ett datum i uppdragsbeskrivningen, oftast ett par veckor före deklarationsdagen. Då finns tid att stämma av och ställa frågor innan redovisningen lämnas in.",
    category: "Bokföring & Löner",
    sort_order: 7,
  },
  {
    id: "8",
    question: "Kan ni sköta hela lönehanteringen?",
    answer:
      "Ja. Vi hanterar löneberäkning, lönespecifikationer, semesterberäkning, reseräkningar, förmåner, arbetsgivardeklaration på individnivå samt rapportering till Skatteverket och kollektivavtalsparter.",
    category: "Bokföring & Löner",
    sort_order: 8,
  },
  {
    id: "9",
    question: "Vad händer om vi upptäcker ett fel i bokföringen?",
    answer:
      "Vi rättar felet enligt god redovisningssed och dokumenterar rättelsen. Om felet påverkar en redovisning som redan lämnats in hjälper vi dig att lämna en rättelse till Skatteverket.",
    category: "Bokföring & Löner",
    sort_order: 9,
  },
  {
    id: "10",
    question: "Vad ingår i en årsredovisning?",
    answer:
      "En årsredovisning innehåller förvaltningsberättelse, resultaträkning, balansräkning och noter. Vi upprättar den enligt gällande regelverk, tar fram inkomstdeklaration för bolaget och går igenom resultatet med dig innan den lämnas in.",
    category: "Årsbokslut",
    sort_order: 10,
  },
  {
    id: "11",
    question: "När ska årsredovisningen vara inne?",
    answer:
      "För aktiebolag ska årsredovisningen lämnas till Bolagsverket senast sju månader efter räkenskapsårets slut. Vi håller koll på datumen i ditt uppdrag och påminner i god tid.",
    category: "Årsbokslut",
    sort_order: 11,
  },
  {
    id: "12",
    question: "Behöver mitt företag en revisor?",
    answer:
      "Mindre aktiebolag är oftast undantagna från revisionsplikt. Om ditt bolag växer över gränsvärdena kan revision krävas, och då samarbetar vi med revisorn kring underlagen. Vi hjälper dig att bedöma vad som gäller.",
    category: "Årsbokslut",
    sort_order: 12,
  },
  {
    id: "13",
    question: "Kan ni hjälpa till med skatteplanering inför bokslutet?",
    answer:
      "Ja, det är en av de vanligaste anledningarna till att kunder anlitar oss. Vi går igenom periodiseringsfonder, avskrivningar, löneuttag och utdelning i god tid före räkenskapsårets slut, då valmöjligheterna är som störst.",
    category: "Årsbokslut",
    sort_order: 13,
  },
  {
    id: "14",
    question: "Vad betyder auktoriserad redovisningskonsult?",
    answer:
      "En auktoriserad redovisningskonsult är kvalitetssäkrad av branschorganisationen, arbetar enligt svensk standard för redovisningsuppdrag (Rex) och genomgår regelbunden kvalitetskontroll samt löpande utbildning.",
    category: "Bli kund",
    sort_order: 14,
  },
  {
    id: "15",
    question: "Hur hanterar ni sekretess och personuppgifter?",
    answer:
      "Allt vi får tillgång till omfattas av sekretess. Personuppgifter behandlas enligt dataskyddsförordningen och lagras i system med behörighetsstyrning. Läs mer i vår integritetspolicy.",
    category: "Bli kund",
    sort_order: 15,
  },
  {
    id: "16",
    question: "Får jag en fast kontaktperson?",
    answer:
      "Ja. Personlig kontakt och kontinuitet är en viktig del av vårt arbetssätt. Du samarbetar med människor som lär känna företaget och kan följa ekonomin över tid, i stället för att börja om med en ny handläggare vid varje fråga.",
    category: "Bli kund",
    sort_order: 16,
  },
];
