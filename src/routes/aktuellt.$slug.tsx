import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArtikelCard, CtaSection } from "@/components/site/Sections";
import { aktuelltQuery } from "@/lib/content/aktuellt";

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
      <Button asChild className="mt-6 rounded-full">
        <Link to="/aktuellt">Till Aktuellt</Link>
      </Button>
    </div>
  ),
  component: ArtikelPage,
});

function ArtikelPage() {
  const { artikel } = Route.useLoaderData();
  const { data: alla } = Route.useRouteContext().queryClient
    ? { data: undefined as never }
    : { data: undefined as never };

  return <ArtikelInnehall artikel={artikel} />;
}

function ArtikelInnehall({ artikel }: { artikel: Awaited<ReturnType<typeof hamtaArtiklar>>[number] }) {
  return null;
}

async function hamtaArtiklar() {
  return [] as never[];
}
