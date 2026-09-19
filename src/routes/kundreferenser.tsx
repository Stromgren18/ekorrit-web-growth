import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { kundreferenserQuery } from "@/lib/content/kundreferenser";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";

const KR_FALLBACK = SIDOR["kundreferenser"] as unknown as HeroSida;

const TITLE = "Kundreferenser – vad våra kunder säger | Ekorrit AB";
const DESCRIPTION =
  "Läs vad företagare säger om personlig kontakt, kontinuitet och ekonomisk rådgivning från Ekorrit AB.";

export const Route = createFileRoute("/kundreferenser")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kundreferenser" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kundreferenser" }],
  }),
  component: KundreferenserPage,
});

function KundreferenserPage() {
  const { data: referenser } = useSuspenseQuery(kundreferenserQuery());
  const sida = useSida<HeroSida>("kundreferenser", KR_FALLBACK);

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
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          {referenser.map((ref) => (
            <figure
              key={ref.id}
              className="flex flex-col rounded-2xl border border-border/70 bg-card p-8 shadow-sm"
            >
              <Quote className="size-6 text-primary" aria-hidden />
              <blockquote className="mt-4 flex-1 leading-relaxed">”{ref.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
                <span className="font-semibold">{ref.client_name}</span>
                <span className="block text-muted-foreground">{ref.company_name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
