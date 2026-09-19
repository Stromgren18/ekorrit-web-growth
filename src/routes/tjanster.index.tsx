import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { tjansterQuery } from "@/lib/content/tjanster";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";

const TJANSTER_FALLBACK = SIDOR["tjanster"] as unknown as HeroSida;

const TITLE = "Tjänster – bokföring, bokslut, löner & rådgivning | Ekorrit AB";
const DESCRIPTION =
  "Bokföring, bokslut, lönehantering, budget och rådgivning med personlig kontakt för företag i Jämtland och hela Sverige.";

export const Route = createFileRoute("/tjanster/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tjanster" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tjanster" }],
  }),
  component: TjansterPage,
});

function TjansterPage() {
  const { data: tjansterLista } = useSuspenseQuery(tjansterQuery());
  const sida = useSida<HeroSida>("tjanster", TJANSTER_FALLBACK);

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
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          {tjansterLista.map((tjanst) => (
            <Card key={tjanst.slug} className="group rounded-2xl border-border/70 transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl">{tjanst.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tjanst.short}</p>
                <ul className="mt-6 space-y-2.5">
                  {tjanst.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-7 rounded-full">
                  <Link to="/tjanster/$slug" params={{ slug: tjanst.slug }}>
                    Läs mer om {tjanst.title.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
