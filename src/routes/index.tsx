import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Calculator, FileText, Landmark, Quote, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArtikelCard, CtaSection, SectionHeading, TrustBand } from "@/components/site/Sections";
import { aktuelltQuery } from "@/lib/content/aktuellt";
import { kundreferenserQuery } from "@/lib/content/kundreferenser";
import { caseSlug } from "@/content/kundreferenser";
import { tjansterQuery } from "@/lib/content/tjanster";
import { useSida } from "@/lib/content/sidor";
import { siteQuery } from "@/lib/content/site";
import { demoStore, type SiteContent } from "@/lib/demoStore";
import { SIDOR, type HemSida } from "@/content/sidor";

const HEM_FALLBACK = SIDOR["hem"] as unknown as HemSida;

const TITLE = "Personlig redovisningsbyrå i Strömsund | Ekorrit AB";
const DESCRIPTION =
  "Privatägd redovisningsbyrå med fem auktoriserade konsulter. Personlig kontakt, redovisning och ekonomisk rådgivning för företag i hela Sverige.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const site = await context.queryClient.ensureQueryData(siteQuery());
    return { site };
  },
  head: ({ loaderData }) => {
    const site: SiteContent = loaderData?.site ?? demoStore.site;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            name: site.name,
            description: DESCRIPTION,
            areaServed: "Sverige",
            address: site.offices.map((o) => ({
              "@type": "PostalAddress",
              streetAddress: o.street,
              addressLocality: o.city,
              addressCountry: "SE",
            })),
          }),
        },
      ],
    };
  },
  component: Index,
});

const tjansteIkoner = [Calculator, FileText, Users, Landmark] as const;

function Index() {
  const hem = useSida<HemSida>("hem", HEM_FALLBACK);
  const { data: allaArtiklar } = useSuspenseQuery(aktuelltQuery());
  const { data: referenser } = useSuspenseQuery(kundreferenserQuery());
  const { data: tjansterLista } = useSuspenseQuery(tjansterQuery());

  const senaste = allaArtiklar.slice(0, 3);
  const featured = referenser.filter((r) => r.is_featured);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section className="relative isolate flex min-h-[85vh] flex-col overflow-hidden">
        <img
          ref={imgRef}
          src={hem.hero.image}
          alt={hem.hero.imageAlt}
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 size-full scale-[1.08] object-cover object-center will-change-transform"
        />
        <div className="hero-overlay absolute inset-0 -z-10" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-12 pt-20 md:pb-16 md:pt-28">
          <div className="reveal max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/85">
              {hem.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] text-balance text-primary-foreground drop-shadow-sm md:text-6xl">
              {hem.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              {hem.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/tjanster">Våra tjänster</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/kontakt">Kontakta oss</Link>
              </Button>
            </div>
          </div>
        </div>
        <TrustBand />
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow={hem.tjanster.eyebrow}
            title={hem.tjanster.title}
            intro={hem.tjanster.intro}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tjansterLista.map((tjanst, i) => {
              const Icon = tjansteIkoner[i % tjansteIkoner.length] ?? Calculator;
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

      <section className="section-y bg-sage-dark text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            {hem.referenser.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                {hem.referenser.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 text-3xl leading-tight text-balance md:text-4xl">{hem.referenser.title}</h2>
          </div>
          <Carousel className="mt-12" opts={{ loop: featured.length > 3, align: "start" }}>
            <CarouselContent className="-ml-6 items-stretch">
              {featured.map((ref, i) => (
                <CarouselItem key={ref.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <figure
                    className={`flex h-full flex-col rounded-2xl p-7 shadow-sm ${
                      i % 3 === 1
                        ? "bg-card text-card-foreground lg:-translate-y-3 lg:shadow-xl"
                        : "border border-primary-foreground/15 bg-primary-foreground/5"
                    }`}
                  >
                    <Quote
                      className={`size-7 ${i % 3 === 1 ? "text-primary" : "text-primary-foreground/60"}`}
                      aria-hidden
                    />
                    <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed">
                      ”{ref.quote}”
                    </blockquote>
                    <figcaption
                      className={`mt-6 flex items-center gap-3 border-t pt-4 text-sm ${
                        i % 3 === 1 ? "border-border/60" : "border-primary-foreground/15"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          i % 3 === 1 ? "bg-secondary text-primary" : "bg-primary-foreground/10"
                        }`}
                        aria-hidden
                      >
                        {ref.client_name
                          .split(" ")
                          .map((d) => d[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span>
                        <span className="block font-semibold">{ref.client_name}</span>
                        <span className={i % 3 === 1 ? "text-muted-foreground" : "text-primary-foreground/70"}>
                          {ref.company_name}
                        </span>
                      </span>
                    </figcaption>
                    {ref.challenge ? (
                      <Link
                        to="/kundreferenser/$slug"
                        params={{ slug: caseSlug(ref) }}
                        className={`mt-4 text-sm font-semibold underline-offset-4 hover:underline ${i % 3 === 1 ? "text-primary" : "text-primary-foreground"}`}
                      >
                        Läs hela caset →
                      </Link>
                    ) : null}
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            {featured.length > 1 ? (
              <>
                <CarouselPrevious className="hidden text-foreground sm:flex lg:hidden" />
                <CarouselNext className="hidden text-foreground sm:flex lg:hidden" />
              </>
            ) : null}
          </Carousel>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/kundreferenser">Fler kundreferenser</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={hem.aktuellt.eyebrow} title={hem.aktuellt.title} />
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
