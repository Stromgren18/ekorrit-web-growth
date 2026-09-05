export const site = {
  name: "Ekorrit AB",
  tagline: "Vi kan ekonomi – räkna med oss",
  description:
    "Auktoriserad redovisningsbyrå i Strömsund och Östersund. Bokföring, årsredovisning, lönehantering och kvalificerad ekonomisk rådgivning.",
  // TODO: Ersätt platshållarna nedan med era riktiga uppgifter.
  phone: "TELEFONNUMMER SAKNAS",
  email: "E-POST SAKNAS",
  orgNumber: "ORGANISATIONSNUMMER SAKNAS",
  openingHours: "Mån–fre: ÖPPETTIDER SAKNAS",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  offices: [
    {
      id: "stromsund",
      city: "Strömsund",
      street: "Lövbergavägen 8",
      postal: "POSTNUMMER SAKNAS Strömsund",
      phone: "TELEFONNUMMER SAKNAS",
      email: "E-POST SAKNAS",
      hours: "Mån–fre: ÖPPETTIDER SAKNAS",
    },
    {
      id: "ostersund",
      city: "Östersund",
      street: "GATUADRESS SAKNAS",
      postal: "POSTNUMMER SAKNAS Östersund",
      phone: "TELEFONNUMMER SAKNAS",
      email: "E-POST SAKNAS",
      hours: "Mån–fre: ÖPPETTIDER SAKNAS",
    },
  ],
} as const;

export const certifications = [
  { name: "ISO 9001", note: "Kvalitetscertifierad" },
  { name: "Srf konsulterna", note: "Auktoriserad byrå" },
  { name: "REX", note: "Svensk standard för redovisningsuppdrag" },
  { name: "Sveriges nöjdaste kunder", note: "Utmärkelse" },
];

export const navigation = [
  { label: "Hem", to: "/" },
  { label: "Tjänster", to: "/tjanster" },
  { label: "Om oss", to: "/om-oss" },
  { label: "Kundreferenser", to: "/kundreferenser" },
  { label: "Frågor & Svar", to: "/faq" },
  { label: "Aktuellt", to: "/aktuellt" },
  { label: "Dokument", to: "/dokument" },
  { label: "Kontakt", to: "/kontakt" },
] as const;
