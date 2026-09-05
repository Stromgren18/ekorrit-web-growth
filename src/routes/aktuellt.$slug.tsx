import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArtikelCard, CtaSection } from "@/components/site/Sections";
import { getAktuellt, getArtikel } from "@/lib/content/aktuellt";

export const Route = createFileRoute("/aktuellt/$slug")({
  loader: ({ params }) => {
    const artikel = getArtikel(params.slug);
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
      <Button asChild className="mt-6 rounded-full">
        <Link to="/aktuellt">Till Aktuellt</Link>
      </Button>
    </div>
  ),
  component: ArtikelPage,
});

function ArtikelPage() {
  const { artikel } = Route.useLoaderData();
  const ovriga = getAktuellt()
    .filter((a) => a.slug !== artikel.slug)
    .slice(0, 3);

  const datum = new Date(artikel.published_at).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="section-y">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            to="/aktuellt"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden /> Tillbaka till Aktuellt
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {artikel.category}
          </p>
          <h1 className="mt-3 text-4xl leading-tight text-balance md:text-5xl">{artikel.title}</h1>
          <time dateTime={artikel.published_at} className="mt-4 block text-sm text-muted-foreground">
            {datum}
          </time>
          <img
            src={artikel.image_url}
            alt={artikel.title}
            width={1200}
            height={800}
            className="mt-8 aspect-[3/2] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {artikel.content
              .split("\n\n")
              .map((stycke) => stycke.trim())
              .filter(Boolean)
              .map((stycke) => (
                <p key={stycke.slice(0, 40)}>{stycke}</p>
              ))}
          </div>
        </div>
      </article>

      <section className="section-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl">Fler artiklar</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ovriga.map((a) => (
              <ArtikelCard key={a.id} artikel={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
