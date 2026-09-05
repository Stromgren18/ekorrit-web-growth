import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, FileText, Landmark, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArtikelCard, CtaSection, SectionHeading, TrustBar } from "@/components/site/Sections";
import { getSenasteAktuellt } from "@/lib/content/aktuellt";
import { getFeaturedKundreferenser } from "@/lib/content/kundreferenser";
import { tjanster } from "@/content/tjanster";
import { site } from "@/content/site";

const TITLE = "Redovisningsbyrå Strömsund & Östersund | Ekorrit AB";
const DESCRIPTION =
  "Ekorrit AB är en auktoriserad redovisningsbyrå i Strömsund och Östersund. Bokföring, årsredovisning, lönehantering och kvalificerad ekonomisk rådgivning.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AccountingService",
          name: "Ekorrit AB",
          description: DESCRIPTION,
          areaServed: "Jämtland, Sverige",
          address: site.offices.map((o) => ({
            "@type": "PostalAddress",
            streetAddress: o.street,
            addressLocality: o.city,
            addressCountry: "SE",
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const tjansteIkoner = [Calculator, FileText, Users, Landmark] as const;

function Index() {
  const senaste = getSenasteAktuellt(3);
  const referenser = getFeaturedKundreferenser();

  return (
    <>
      <section className="relative overflow-hidden bg-secondary/50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Auktoriserad redovisningskonsult
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] text-balance md:text-6xl">
              Vi kan ekonomi – räkna med oss
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ekonomisk rådgivning &amp; redovisning i Strömsund &amp; Östersund. Vi tar hand om
              bokföring, bokslut och löner – du får tid till din verksamhet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/tjanster">Våra tjänster</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-background">
                <Link to="/kontakt">Kontakta oss</Link>
              </Button>
            </div>
          </div>
          <div className="reveal">
            <img
              src="/images/hero-kontor.jpg"
              alt="Ljust kontor med dokument och dator hos redovisningsbyrån Ekorrit AB"
              width={1600}
              height={1104}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Våra tjänster"
            title="Bokföring i Östersund och redovisning i Strömsund"
            intro="Vi arbetar med hela ekonomifunktionen för små och medelstora företag i Jämtland – från löpande bokföring till kvalificerad rådgivning."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tjanster.map((tjanst, i) => {
              const Icon = tjansteIkoner[i % tjansteIkoner.length]!;
              return (
                <Card
                  key={tjanst.slug}
                  className="group rounded-2xl border-border/70 transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg">{tjanst.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tjanst.short}</p>
                    <Link
                      to="/tjanster/$slug"
                      params={{ slug: tjanst.slug }}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      Läs mer <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Kundreferenser" title="Vad våra kunder säger" center />
          <Carousel className="mx-auto mt-12 max-w-4xl" opts={{ loop: true }}>
            <CarouselContent>
              {referenser.map((ref) => (
                <CarouselItem key={ref.id}>
                  <figure className="rounded-2xl bg-card p-8 text-center shadow-sm md:p-12">
                    <blockquote className="font-display text-xl leading-relaxed text-balance md:text-2xl">
                      ”{ref.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{ref.client_name}</span>
                      <span className="block">{ref.company_name}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full bg-background">
              <Link to="/kundreferenser">Fler kundreferenser</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Aktuellt" title="Senaste nytt från byrån" />
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/aktuellt">Se allt</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {senaste.map((artikel) => (
              <ArtikelCard key={artikel.id} artikel={artikel} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
