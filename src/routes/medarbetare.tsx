import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";

import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { SIDOR, type HeroSida } from "@/content/sidor";
import { medarbetareQuery } from "@/lib/content/medarbetare";
import { useSida } from "@/lib/content/sidor";

const FALLBACK = SIDOR["medarbetare"] as unknown as HeroSida;
const TITLE = "Medarbetare – möt teamet på Ekorrit AB";
const DESCRIPTION =
  "Möt redovisningskonsulterna på Ekorrit AB i Strömsund och Östersund. Personliga kontakter inom redovisning, lön och rådgivning.";

export const Route = createFileRoute("/medarbetare")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/medarbetare" }],
  }),
  component: MedarbetarePage,
});

function MedarbetarePage() {
  const sida = useSida<HeroSida>("medarbetare", FALLBACK);
  const { data } = useSuspenseQuery(medarbetareQuery());
  const synliga = data.filter((person) => person.is_visible !== false);

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
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {synliga.map((person) => (
              <article key={person.id} className="min-w-0">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                  {person.image_url ? (
                    <img
                      src={person.image_url}
                      alt={`Porträtt av ${person.name}`}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                      Porträtt kommer snart
                    </div>
                  )}
                </div>
                <div className="pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {person.role}
                  </p>
                  <h2 className="mt-2 text-2xl leading-tight">{person.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  {person.email || person.phone ? (
                    <div className="mt-4 flex flex-col gap-2 text-sm">
                      {person.email ? (
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex min-w-0 items-center gap-2 text-foreground transition-colors hover:text-primary"
                        >
                          <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                          <span className="truncate">{person.email}</span>
                        </a>
                      ) : null}
                      {person.phone ? (
                        <a
                          href={`tel:${person.phone}`}
                          className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                        >
                          <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                          {person.phone}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}