export const localPages = {
  stromsund: {
    city: "Strömsund",
    path: "/redovisningsbyra-stromsund",
    title: "Redovisningsbyrå Strömsund – bokföring & rådgivning | Ekorrit",
    description: "Ekorrit i Strömsund hjälper ditt företag med bokföring, bokslut, löner och rådgivning. Kontakta vårt huvudkontor på Lövbergavägen 8 eller boka ett digitalt möte.",
    intro: "Med rötterna i Strömsund hjälper vi dig att få ordning på ekonomin och tid över till företaget. Från den löpande bokföringen till nästa viktiga beslut finns vi med i din vardag.",
    heading: "Nära ditt företag, mitt i Strömsund",
    paragraphs: [
      "På vårt huvudkontor på Lövbergavägen 8 möter du Ekorrits team. Härifrån samarbetar vi med företag i Strömsund med omnejd – på plats, via telefon och digitalt.",
      "Driver du ett byggföretag, en butik eller ett tjänsteföretag? Vi utgår från hur din verksamhet fungerar och kommer tillsammans fram till vilka delar av ekonomin du vill ha hjälp med. Du kan lämna över hela redovisningen eller få stöd i utvalda delar.",
      "Ett möte hos oss eller digitalt är en bra början. Berätta om ditt företag, dina rutiner och vad du vill förenkla, så pratar vi om hur ett samarbete kan se ut.",
    ],
    visit: "Vill du träffa oss på huvudkontoret? Ring eller mejla innan ditt besök så kommer vi överens om en tid.",
    servicesIntro: "Oavsett om du är nystartad eller har drivit företag länge kan vi hjälpa dig med ekonomiarbetet i Strömsund.",
    otherCity: "Östersund",
    otherPath: "/redovisningsbyra-ostersund",
  },
  ostersund: {
    city: "Östersund",
    path: "/redovisningsbyra-ostersund",
    title: "Redovisningsbyrå Östersund – personlig ekonomihjälp | Ekorrit",
    description: "Bokföring, bokslut, löner och rådgivning för företag i Östersund. Träffa Ekorrit på Armégränd 6 efter överenskommelse eller samarbeta digitalt. Kontakta oss.",
    intro: "För dig som driver företag i Östersund erbjuder vi personlig hjälp med redovisning och ekonomiska frågor. Vi samarbetar digitalt och träffas på vårt lokalkontor när det passar – efter överenskommelse.",
    heading: "Digitalt i vardagen, möten i Östersund",
    paragraphs: [
      "Ditt företag behöver ekonomistöd som fungerar i vardagen. Med Ekorrit kan du sköta kontakten digitalt och via telefon, och boka ett personligt möte på Armégränd 6 i Östersund.",
      "Lokalkontoret är obemannat och tar emot besök endast efter överenskommelse. Vårt team utgår från huvudkontoret i Strömsund, men avståndet behöver inte styra hur vi arbetar tillsammans.",
      "För företag inom exempelvis handel, besöksnäring och konsultverksamhet kan behoven se olika ut över året. Vi pratar igenom dina rutiner och vilket stöd du behöver med bokföring, löner, bokslut eller rådgivning.",
    ],
    visit: "Lokalkontoret är obemannat. Boka alltid ditt besök i förväg via telefon eller e-post. Du är också välkommen att boka ett digitalt möte.",
    servicesIntro: "Vi hjälper företag i Östersund att samla ekonomiarbetet – med löpande digital kontakt och personliga möten efter överenskommelse.",
    otherCity: "Strömsund",
    otherPath: "/redovisningsbyra-stromsund",
  },
} as const;

export type LocalCity = keyof typeof localPages;

export function localPageHead(city: LocalCity) {
  const page = localPages[city];
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