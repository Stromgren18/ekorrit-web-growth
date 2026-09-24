/**
 * Exempelprofiler för demoläget. Byt namn, texter och porträtt i adminpanelen
 * innan sidan publiceras med riktiga medarbetaruppgifter.
 */
export type Medarbetare = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  sort_order: number;
  is_visible: boolean;
};

export const medarbetare: Medarbetare[] = [
  {
    id: "demo-medarbetare-1",
    name: "Medarbetare 1",
    role: "Auktoriserad redovisningskonsult",
    bio: "Skriv en kort och personlig presentation om erfarenhet, specialistområden och vad personen uppskattar mest i kundsamarbetet.",
    image_url: "/images/medarbetare-1.jpg",
    email: "info@ekorrit.se",
    phone: "+4667017570",
    sort_order: 1,
    is_visible: true,
  },
  {
    id: "demo-medarbetare-2",
    name: "Medarbetare 2",
    role: "Redovisningskonsult",
    bio: "Ersätt exempeltexten med en lättläst presentation som hjälper kunderna att lära känna personen bakom siffrorna.",
    image_url: "/images/medarbetare-2.jpg",
    email: "info@ekorrit.se",
    phone: "+4667017570",
    sort_order: 2,
    is_visible: true,
  },
  {
    id: "demo-medarbetare-3",
    name: "Medarbetare 3",
    role: "Lönekonsult",
    bio: "Berätta gärna om personens roll, kompetens och hur hon eller han hjälper företagets kunder i vardagen.",
    image_url: "/images/medarbetare-3.jpg",
    email: "info@ekorrit.se",
    phone: "+4667017570",
    sort_order: 3,
    is_visible: true,
  },
];