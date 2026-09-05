import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";

import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { getKundreferenser } from "@/lib/content/kundreferenser";

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
    ],
    links: [{ rel: "canonical", href: "/kundreferenser" }],
  }),
  component: KundreferenserPage,
});

function KundreferenserPage() {
  const referenser = getKundreferenser();

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            as="h1"
            eyebrow="Kundreferenser"
            title="Långsiktiga relationer med våra kunder"
            intro="När vi lär känna företaget kan vi bidra med mer än bokföring. Här berättar några kunder om samarbetet med Ekorrit."
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
