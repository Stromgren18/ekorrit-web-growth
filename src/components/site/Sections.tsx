import { Link } from "@tanstack/react-router";
import { Award, BadgeCheck, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSite } from "@/lib/content/site";
import type { Artikel } from "@/content/aktuellt";

const icons = [ShieldCheck, BadgeCheck, Award, Star] as const;

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = "h2",
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  center?: boolean;
}) {
  const Tag = as;
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      ) : null}
      <Tag className="mt-3 text-3xl leading-tight text-balance md:text-4xl">{title}</Tag>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export function TrustBar() {
  const site = useSite();
  return (
    <section aria-label="Certifieringar och utmärkelser" className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {site.certifications.map((cert, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <div key={cert.name} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{cert.name}</span>
                <span className="block text-xs text-muted-foreground">{cert.note}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Frostat trygghetsband som ligger i nederkanten av en helbilds-hero. */
export function TrustBand() {
  const site = useSite();
  return (
    <div aria-label="Certifieringar och utmärkelser" className="relative isolate w-full">
      <div className="trust-fade pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[calc(100%+6rem)]" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 pb-10 pt-4 sm:gap-x-8 lg:grid-cols-4">
        {site.certifications.map((cert, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <div key={cert.name} className="flex items-center gap-3 drop-shadow-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug text-primary-foreground">{cert.name}</span>
                <span className="block text-xs leading-snug text-primary-foreground/80">{cert.note}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ArtikelCard({ artikel }: { artikel: Artikel }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/70 p-0 transition-shadow hover:shadow-lg">
      <Link to="/aktuellt/$slug" params={{ slug: artikel.slug }} className="block">
        <img
          src={artikel.image_url}
          alt={artikel.title}
          loading="lazy"
          width={1200}
          height={800}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
              {artikel.category}
            </span>
            <time dateTime={artikel.published_at}>
              {new Date(artikel.published_at).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h3 className="mt-3 text-lg leading-snug text-balance">{artikel.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{artikel.excerpt}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

export function CtaSection() {
  const site = useSite();
  return (
    <section className="section-y bg-sage-dark text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl leading-tight text-balance md:text-4xl">
          {site.cta.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
          {site.cta.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/kontakt">Kontakta oss</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link to="/tjanster">Se våra tjänster</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
