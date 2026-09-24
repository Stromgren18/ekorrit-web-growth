export const site = {
  name: "Ekorrit AB",
  tagline: "Vi kan ekonomi – räkna med oss",
  description:
    "Privatägd och auktoriserad redovisningsbyrå med rötterna i Strömsund. Personlig redovisning, lönehantering och ekonomisk rådgivning för företag i hela Sverige.",
  phone: "+4667017570",
  email: "info@ekorrit.se",
  orgNumber: "5566536321",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  offices: [
    {
      id: "stromsund",
      city: "Strömsund",
      role: "Huvudkontor",
      street: "Lövbergavägen 8",
      postal: "833 35 Strömsund",
      phone: "+4667017570",
      email: "info@ekorrit.se",
    },
    {
      id: "ostersund",
      city: "Östersund",
      role: "Obemannat lokalkontor – besök efter överenskommelse",
      street: "Armégränd 6",
      postal: "831 32 Östersund",
      phone: "+4667017570",
      email: "info@ekorrit.se",
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
  { label: "Medarbetare", to: "/medarbetare" },
  { label: "Kundreferenser", to: "/kundreferenser" },
  { label: "Frågor & Svar", to: "/faq" },
  { label: "Aktuellt", to: "/aktuellt" },
  { label: "Dokument", to: "/dokument" },
  { label: "Kontakt", to: "/kontakt" },
] as const;
