export const localPages = {
  stromsund: {
    city: "Strömsund",
    path: "/redovisningsbyra-stromsund",
    title: "Redovisningsbyrå i Strömsund – bokföring & rådgivning | Ekorrit",
    description: "Personlig redovisning i Strömsund. Ekorrit hjälper dig med bokföring, bokslut, löner och rådgivning. Kontakta huvudkontoret på Lövbergavägen 8.",
    intro: "Med rötterna och huvudkontoret i Strömsund hjälper vi dig att få ordning på ekonomin och mer tid till ditt företag. En personlig kontakt, nära din vardag.",
    heading: "Lokalt förankrade. Nära ditt företag.",
    paragraphs: [
      "Driver du företag i Strömsund eller någon av orterna runt omkring? Hos Ekorrit kan du samla den löpande bokföringen, lönerna och bokslutet hos en och samma byrå. Vi utgår från hur din verksamhet fungerar och kommer överens om vilket stöd du behöver.",
      "För dig som arbetar inom exempelvis bygg, transport, handel eller service kan ekonomin behöva följa både projekten och vardagen. Vi hjälper dig att förstå resultatet, planera likviditeten och få ett bättre underlag inför nästa beslut.",
      "Du hittar vårt huvudkontor på Lövbergavägen 8. Ring eller mejla för att boka ett möte – på kontoret eller digitalt när det passar bättre.",
    ],
    visit: "Boka ett möte på vårt huvudkontor i Strömsund. Vi kan också träffas digitalt eller ta ett första samtal på telefon.",
    services: [
      "Löpande bokföring, moms och avstämningar som ger överblick även när vardagen är full av annat.",
      "Bokslut och årsredovisning med en genomgång av vad årets siffror betyder för ditt företag.",
      "Löneadministration för dig med anställda – från löneunderlag till rapportering.",
      "Ett personligt bollplank för investeringar, budget och likviditet i din verksamhet.",
    ],
  },
  ostersund: {
    city: "Östersund",
    path: "/redovisningsbyra-ostersund",
    title: "Redovisningsbyrå i Östersund – personlig redovisning | Ekorrit",
    description: "Bokföring, bokslut, löner och ekonomisk rådgivning för företag i Östersund. Träffa Ekorrit digitalt eller på Armégränd 6 efter överenskommelse.",
    intro: "För dig som driver företag i Östersund och vill ha ett personligt ekonomiskt bollplank. Vi samarbetar digitalt och kan boka ett möte på vårt lokalkontor.",
    heading: "Personlig redovisning för företag i Östersund",
    paragraphs: [
      "Oavsett om du driver ett konsultbolag, en butik eller ett växande tjänsteföretag i Östersund behöver du ekonomisk överblick. Ekorrit hjälper dig med redovisningen och att omsätta siffrorna i beslut för verksamheten.",
      "Digitala underlag gör det enkelt att hålla kontakten mellan mötena. Du lämnar fakturor och kvitton digitalt, medan vi tillsammans går igenom rapporter, frågor och planering. Det personliga samarbetet finns kvar även när vi inte sitter i samma rum.",
      "Vårt huvudkontor finns i Strömsund. I Östersund har vi ett obemannat lokalkontor på Armégränd 6, där besök sker efter överenskommelse. Kontakta oss i förväg så hittar vi en tid och en mötesform som passar dig.",
    ],
    visit: "Lokalkontoret i Östersund är obemannat. Besök på Armégränd 6 sker endast efter överenskommelse – ring eller mejla för att boka. Digitala möten går också bra.",
    services: [
      "Digital bokföring, moms och rapporter för företag i Östersund – med en kontakt som känner verksamheten.",
      "Bokslut, årsredovisning och deklaration, med utrymme att prata om året som kommer.",
      "Stöd med löner, semester och arbetsgivardeklaration när ditt företag har anställda.",
      "Rådgivning kring budget, tillväxt och likviditet inför anställningar och nya satsningar.",
    ],
  },
} as const;

export type LocalPage = (typeof localPages)[keyof typeof localPages];

export function localHead(page: LocalPage) {
  const url = `https://ekorrit.frilansnorr.se${page.path}`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}