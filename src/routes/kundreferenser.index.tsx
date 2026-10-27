import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Quote } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { kundreferenserQuery } from "@/lib/content/kundreferenser";
import { caseSlug } from "@/content/kundreferenser";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";

const KR_FALLBACK = SIDOR["kundreferenser"] as unknown as HeroSida;
const URL = "https://ekorrit.lovable.app/kundreferenser";
const TITLE = "Kundcase & referenser – redovisning i Jämtland | Ekorrit AB";
const DESCRIPTION =
  "Se hur Ekorrit AB hjälper företag i Strömsund, Östersund och Jämtland med bokföring, löner, bokslut och rådgivning.";

export const Route = createFileRoute("/kundreferenser/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(kundreferenserQuery()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: KundreferenserPage,
});

function KundreferenserPage() {
  const { data: referenser } = useSuspenseQuery(kundreferenserQuery());
  const sida = useSida<HeroSida>("kundreferenser", KR_FALLBACK);
  const [bransch, setBransch] = useState<string | null>(null);

  const cases = referenser.filter((r) => r.challenge);
  const citat = referenser.filter((r) => !r.challenge);
  const branscher = [...new Set(cases.map((c) => c.industry).filter(Boolean))] as string[];
  const synliga = bransch ? cases.filter((c) => c.industry === bransch) : cases;

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading as="h1" eyebrow={sida.hero.eyebrow} title={sida.hero.title} intro={sida.hero.intro} />
        </div>
      </section>

      {cases.length ? (
        <section className="section-y">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl">Kundcase</h2>
            {branscher.length > 1 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {[null, ...branscher].map((b) => (
                  <button
                    key={b ?? "alla"}
                    onClick={() => setBransch(b)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      bransch === b ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {b ?? "Alla branscher"}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {synliga.map((c) => (
                <Link
                  key={c.id}
                  to="/kundreferenser/$slug"
                  params={{ slug: caseSlug(c) }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-sage-dark">
                    {c.image_url ? (
                      <img src={c.image_url} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex size-full items-center justify-center font-display text-3xl text-primary-foreground/80">
                        {c.company_name.split(" ")[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {c.industry ? (
                      <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{c.industry}</span>
                    ) : null}
                    <h3 className="mt-3 text-xl">{c.company_name}</h3>
                    {c.location ? (
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" aria-hidden /> {c.location}
                      </p>
                    ) : null}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.excerpt ?? c.quote}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Läs hela caset <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {citat.length ? (
        <section className="section-y bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl">Fler röster från våra kunder</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {citat.map((ref) => (
                <figure key={ref.id} className="flex flex-col rounded-2xl border border-border/70 bg-card p-8 shadow-sm">
                  <Quote className="size-6 text-primary" aria-hidden />
                  <blockquote className="mt-4 flex-1 leading-relaxed">”{ref.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
                    <span className="font-semibold">{ref.client_name}</span>
                    <span className="block text-muted-foreground">{ref.company_name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
