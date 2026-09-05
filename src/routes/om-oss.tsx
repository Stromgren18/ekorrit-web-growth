import { createFileRoute } from "@tanstack/react-router";

import { CtaSection, SectionHeading, TrustBar } from "@/components/site/Sections";
import { site } from "@/content/site";

const TITLE = "Om oss – auktoriserad redovisningsbyrå i Jämtland | Ekorrit AB";
const DESCRIPTION =
  "Ekorrit AB är en auktoriserad redovisningsbyrå med kontor i Strömsund och Östersund. Möt teamet och läs om hur vi arbetar med kvalitet och personlig service.";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOssPage,
});

const varderingar = [
  {
    title: "Nära dig",
    body: "Du har en fast kontaktperson som känner ditt bolag och svarar när du ringer – inget växelsystem, inga ärendenummer.",
  },
  {
    title: "Kvalitetssäkrat arbete",
    body: "Vi arbetar enligt ISO 9001 och Srf Konsulternas regelverk, med dokumenterade rutiner för varje uppdrag.",
  },
  {
    title: "Rådgivning som lönar sig",
    body: "Vi nöjer oss inte med att bokföra historik. Du får underlag och förslag som påverkar resultatet framåt.",
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
            title="Auktoriserad redovisningskonsult i Strömsund och Östersund"
            intro="Ekorrit AB har hjälpt företag i Jämtland med ekonomi sedan starten. Vi kombinerar lokal närhet med kompetensen hos en auktoriserad byrå."
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
            <h2 className="text-3xl">Ekonomi ska kännas tryggt</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Vi är ett team av redovisningskonsulter och lönespecialister som arbetar för små och medelstora
              företag – från enskilda firmor till koncerner med flera bolag. Med kontor i både Strömsund och
              Östersund finns vi nära dig, och digitala flöden gör att avståndet aldrig behöver vara ett hinder.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Vår ambition är enkel: du ska kunna fokusera på din verksamhet och känna dig helt trygg med att
              bokföring, bokslut, löner och deklarationer sköts i tid och rätt.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm text-muted-foreground">Kontor</dt>
                <dd className="font-display text-2xl">{site.offices.length}</dd>
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
