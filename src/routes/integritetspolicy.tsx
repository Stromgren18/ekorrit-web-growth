import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/content/site";

const TITLE = "Integritetspolicy | Ekorrit AB";
const DESCRIPTION =
  "Så behandlar Ekorrit AB personuppgifter enligt GDPR – vilka uppgifter vi samlar in, varför och vilka rättigheter du har.";

export const Route = createFileRoute("/integritetspolicy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/integritetspolicy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/integritetspolicy" }],
  }),
  component: IntegritetspolicyPage,
});

const avsnitt = [
  {
    heading: "Personuppgiftsansvarig",
    body: `${site.name} (org.nr ${site.orgNumber}) är personuppgiftsansvarig för de uppgifter som behandlas inom våra uppdrag och på denna webbplats.`,
  },
  {
    heading: "Vilka uppgifter vi behandlar",
    body: "Vi behandlar kontaktuppgifter som namn, företag, e-post och telefonnummer samt de bokförings- och löneunderlag som krävs för att utföra våra uppdrag.",
  },
  {
    heading: "Varför vi behandlar dem",
    body: "Uppgifterna används för att fullgöra avtal med dig som kund, för att kunna svara på förfrågningar och för att uppfylla de krav som bokföringslagen och penningtvättslagen ställer på oss.",
  },
  {
    heading: "Hur länge vi sparar uppgifterna",
    body: "Underlag som omfattas av bokföringslagen sparas i sju år. Övriga kontaktuppgifter sparas så länge det finns en kundrelation eller ett berättigat intresse.",
  },
  {
    heading: "Dina rättigheter",
    body: "Du har rätt att begära ett registerutdrag, få felaktiga uppgifter rättade och i vissa fall få uppgifter raderade. Kontakta oss om du vill använda någon av dessa rättigheter.",
  },
  {
    heading: "Kontakt",
    body: `Frågor om personuppgifter besvaras på ${site.email} eller ${site.phone}.`,
  },
];

function IntegritetspolicyPage() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl leading-tight md:text-5xl">Integritetspolicy</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Din integritet är viktig för oss. Här beskriver vi hur vi hanterar personuppgifter.
        </p>
        <div className="mt-12 space-y-9">
          {avsnitt.map((a) => (
            <article key={a.heading}>
              <h2 className="text-xl">{a.heading}</h2>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
