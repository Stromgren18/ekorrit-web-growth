import { createFileRoute } from "@tanstack/react-router";

import { CtaSection, SectionHeading, TrustBar } from "@/components/site/Sections";
const TITLE = "Om Ekorrit – personlig redovisningsbyrå i Jämtland";
const DESCRIPTION =
  "Ekorrit är en privatägd, lokalt förankrad redovisningsbyrå med fem auktoriserade konsulter och kunder i hela Sverige.";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/om-oss" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOssPage,
});

const varderingar = [
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
];

function OmOssPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            as="h1"
            eyebrow="Om oss"
            title="Personligt, tryggt och okomplicerat"
            intro="Som privatägd och lokalt förankrad redovisningsbyrå erbjuder vi personlig kontakt, kontinuitet och ett långsiktigt samarbete."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <img
            src="/images/aktuellt-mote.jpg"
            alt="Rådgivningsmöte mellan redovisningskonsult och företagare"
            width={1200}
            height={800}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h2 className="text-3xl">Här vet du vem du pratar med</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Hos Ekorrit finns fem auktoriserade redovisningskonsulter. Du får möjlighet att bygga en relation
              med människor som lär känna ditt företag och din verksamhet, i stället för att möta en ny
              handläggare från gång till gång.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Huvudkontoret finns i Strömsund och i Östersund har vi ett obemannat lokalkontor. Digitala möten
              gör att vi kan vara den personliga jämtländska redovisningsbyrån även för företag i andra delar
              av Sverige – med ett norrländskt lugn i samarbetet.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm text-muted-foreground">Auktoriserade konsulter</dt>
                <dd className="font-display text-2xl">5</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Kvalitetsledning</dt>
                <dd className="font-display text-2xl">ISO 9001</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Så arbetar vi" title="Tre saker du kan räkna med" center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {varderingar.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/70 bg-card p-7 shadow-sm">
                <h3 className="text-lg">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
