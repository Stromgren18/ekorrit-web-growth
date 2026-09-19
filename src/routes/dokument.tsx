import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";

import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { dokumentQuery } from "@/lib/content/dokument";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";

const DOK_FALLBACK = SIDOR["dokument"] as unknown as HeroSida;

const TITLE = "Dokument och blanketter för kunder | Ekorrit AB";
const DESCRIPTION =
  "Ladda ner blanketter, checklistor och mallar för samarbetet med Ekorrit – personlig redovisningsbyrå för företag i hela Sverige.";

export const Route = createFileRoute("/dokument")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dokument" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/dokument" }],
  }),
  component: DokumentPage,
});

function DokumentPage() {
  const { data: dokumentLista } = useSuspenseQuery(dokumentQuery());
  const sida = useSida<HeroSida>("dokument", DOK_FALLBACK);
  const kategorier = [...new Set(dokumentLista.map((d) => d.category))];

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
        <div className="mx-auto max-w-4xl space-y-12 px-4">
          {kategorier.map((kategori) => (
            <div key={kategori}>
              <h2 className="text-xl">{kategori}</h2>
              <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card">
                {dokumentLista
                  .filter((d) => d.category === kategori)
                  .map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.href}
                        className="flex items-start gap-4 p-5 transition-colors hover:bg-secondary/60"
                      >
                        <FileText className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                        <span className="flex-1">
                          <span className="block font-medium">{d.title}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{d.description}</span>
                        </span>
                        <Download className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
