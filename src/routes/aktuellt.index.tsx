import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ArtikelCard, CtaSection, SectionHeading } from "@/components/site/Sections";
import { AKTUELLT_KATEGORIER } from "@/content/aktuellt";
import { getAktuellt } from "@/lib/content/aktuellt";
import { cn } from "@/lib/utils";

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
    ],
    links: [{ rel: "canonical", href: "/aktuellt" }],
  }),
  component: AktuelltPage,
});

function AktuelltPage() {
  const artiklar = getAktuellt();
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
          <SectionHeading
            as="h1"
            eyebrow="Aktuellt"
            title="Kunskap för bättre ekonomiska beslut"
            intro="Aktuellt om skatt, bokslut, budget, löner och sådant som hjälper dig att planera företagets ekonomi framåt."
          />
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
