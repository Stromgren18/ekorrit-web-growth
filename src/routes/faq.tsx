import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CtaSection, SectionHeading } from "@/components/site/Sections";
import { FAQ_KATEGORIER } from "@/content/faq";
import { getFaq } from "@/lib/content/faq";

const TITLE = "Frågor & svar om bokföring och redovisning | Ekorrit AB";
const DESCRIPTION =
  "Vanliga frågor om att bli kund, löpande bokföring, löner och årsbokslut – svarade av auktoriserade redovisningskonsulter i Strömsund och Östersund.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const alla = getFaq();
  const [query, setQuery] = useState("");

  const traffar = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return alla;
    return alla.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
  }, [alla, query]);

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            as="h1"
            eyebrow="Frågor & svar"
            title="Vanliga frågor om redovisning och bokföring"
            intro="Hittar du inte svaret här? Ring oss eller skicka ett meddelande – vi svarar gärna."
          />
          <div className="relative mt-8 max-w-md">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök bland frågorna…"
              aria-label="Sök bland frågor och svar"
              className="h-12 rounded-full bg-background pl-11"
            />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-3xl px-4">
          {traffar.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Inga frågor matchade ”{query}”. Prova ett annat sökord.
            </p>
          ) : (
            <div className="space-y-12">
              {FAQ_KATEGORIER.map((kategori) => {
                const items = traffar.filter((f) => f.category === kategori);
                if (items.length === 0) return null;
                return (
                  <div key={kategori}>
                    <h2 className="text-xl">{kategori}</h2>
                    <Accordion type="single" collapsible className="mt-4">
                      {items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                          <AccordionContent className="leading-relaxed text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
