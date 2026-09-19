import { createFileRoute } from "@tanstack/react-router";

import { CtaSection, SectionHeading, TrustBar } from "@/components/site/Sections";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type OmOssSida } from "@/content/sidor";

const OM_FALLBACK = SIDOR["om-oss"] as unknown as OmOssSida;

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

function OmOssPage() {
  const sida = useSida<OmOssSida>("om-oss", OM_FALLBACK);

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            as="h1"
            eyebrow={sida.hero.eyebrow}
            title={sida.hero.title}
            intro={sida.hero.intro}
          />
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <img
            src={sida.bild.url}
            alt={sida.bild.alt}
            width={1200}
            height={800}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h2 className="text-3xl">{sida.body.title}</h2>
            {sida.body.stycken.map((stycke, i) => (
              <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
                {stycke}
              </p>
            ))}
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {sida.nyckeltal.map((n) => (
                <div key={n.label}>
                  <dt className="text-sm text-muted-foreground">{n.label}</dt>
                  <dd className="font-display text-2xl">{n.varde}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Så arbetar vi" title="Tre saker du kan räkna med" center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {sida.varderingar.map((v) => (
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
