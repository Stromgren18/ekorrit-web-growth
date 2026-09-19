import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ArtikelCard, CtaSection, SectionHeading } from "@/components/site/Sections";
import { AKTUELLT_KATEGORIER } from "@/content/aktuellt";
import { aktuelltQuery } from "@/lib/content/aktuellt";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";
import { cn } from "@/lib/utils";

const AKTUELLT_FALLBACK = SIDOR["aktuellt"] as unknown as HeroSida;

const TITLE = "Aktuellt – skattenyheter och kontorsnytt | Ekorrit AB";
const DESCRIPTION =
  "Aktuellt om skatt, bokslut, budget, löner och rådgivning från den personliga jämtländska redovisningsbyrån Ekorrit.";

export const Route = createFileRoute("/aktuellt/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aktuellt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aktuellt" }],
  }),
  component: AktuelltPage,
});

function AktuelltPage() {
  const { data: artiklar } = useSuspenseQuery(aktuelltQuery());
  const sida = useSida<HeroSida>("aktuellt", AKTUELLT_FALLBACK);
  const [kategori, setKategori] = useState<string | null>(null);

  const filtrerade = useMemo(
    () => (kategori ? artiklar.filter((a) => a.category === kategori) : artiklar),
    [artiklar, kategori],
  );

  const filter = [{ label: "Alla", value: null }, ...AKTUELLT_KATEGORIER.map((k) => ({ label: k, value: k }))];

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading as="h1" eyebrow={sida.hero.eyebrow} title={sida.hero.title} intro={sida.hero.intro} />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {filter.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setKategori(f.value)}
                aria-pressed={kategori === f.value}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  kategori === f.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-secondary",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          {filtrerade.length === 0 ? (
            <p className="text-center text-muted-foreground">Inga artiklar i den här kategorin just nu.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtrerade.map((artikel) => (
                <ArtikelCard key={artikel.id} artikel={artikel} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
