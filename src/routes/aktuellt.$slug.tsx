import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArtikelCard, CtaSection } from "@/components/site/Sections";
import { aktuelltQuery } from "@/lib/content/aktuellt";
import type { Artikel } from "@/content/aktuellt";

export const Route = createFileRoute("/aktuellt/$slug")({
  loader: async ({ params, context }) => {
    const alla = await context.queryClient.ensureQueryData(aktuelltQuery());
    const artikel = alla.find((a) => a.slug === params.slug);
    if (!artikel) throw notFound();
    return { artikel };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artikeln hittades inte | Ekorrit AB" }, { name: "robots", content: "noindex" }],
      };
    }
    const { artikel } = loaderData;
    const title = `${artikel.title} | Ekorrit AB`;
    return {
      meta: [
        { title },
        { name: "description", content: artikel.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: artikel.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/aktuellt/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/aktuellt/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: artikel.title,
            description: artikel.excerpt,
            datePublished: artikel.published_at,
            articleSection: artikel.category,
            author: { "@type": "Organization", name: "Ekorrit AB" },
            publisher: { "@type": "Organization", name: "Ekorrit AB" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl">Artikeln hittades inte</h1>
      <p className="mt-3 text-muted-foreground">Länken kan vara gammal eller felstavad.</p>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/aktuellt">Till Aktuellt</Link>
      </Button>
    </div>
  ),
  component: ArtikelPage,
});

function ArtikelPage() {
  const { artikel: laddad } = Route.useLoaderData();
  const { data: alla } = useSuspenseQuery(aktuelltQuery());
  // Listan innehåller eventuella förhandsgranskningsutkast – den vinner.
  const artikel = alla.find((a) => a.slug === laddad.slug) ?? laddad;
  const relaterade = alla.filter((a) => a.slug !== artikel.slug).slice(0, 3);
  const stycken = artikel.content.split("\n\n").filter(Boolean);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <Button asChild variant="ghost" className="rounded-full -ml-4 mb-6">
          <Link to="/aktuellt">
            <ArrowLeft className="size-4" aria-hidden /> Tillbaka till Aktuellt
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
            {artikel.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden />
            <time dateTime={artikel.published_at}>
              {new Date(artikel.published_at).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </div>

        <h1 className="mt-4 text-3xl leading-tight text-balance md:text-4xl">{artikel.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{artikel.excerpt}</p>

        <img
          src={artikel.image_url}
          alt={artikel.title}
          loading="lazy"
          width={1200}
          height={800}
          className="mt-8 aspect-[3/2] w-full rounded-2xl object-cover"
        />

        <div className="prose-sv mt-10 space-y-5 text-base leading-relaxed">
          {stycken.map((stycke, i) => (
            <p key={i}>{stycke}</p>
          ))}
        </div>
      </article>

      <section className="section-y border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl">Fler artiklar</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relaterade.map((a: Artikel) => (
              <ArtikelCard key={a.id} artikel={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
