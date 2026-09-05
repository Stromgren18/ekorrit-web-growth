import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/site/Sections";
import { getTjanst, tjanster } from "@/content/tjanster";

export const Route = createFileRoute("/tjanster/$slug")({
  loader: ({ params }) => {
    const tjanst = getTjanst(params.slug);
    if (!tjanst) throw notFound();
    return { tjanst };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tjänsten hittades inte | Ekorrit AB" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tjanst } = loaderData;
    return {
      meta: [
        { title: tjanst.metaTitle },
        { name: "description", content: tjanst.metaDescription },
        { property: "og:title", content: tjanst.metaTitle },
        { property: "og:description", content: tjanst.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/tjanster/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/tjanster/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: tjanst.title,
            description: tjanst.metaDescription,
            areaServed: "Strömsund, Östersund, Jämtland",
            provider: { "@type": "AccountingService", name: "Ekorrit AB" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl">Tjänsten hittades inte</h1>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/tjanster">Till alla tjänster</Link>
      </Button>
    </div>
  ),
  component: TjanstPage,
});

function TjanstPage() {
  const { tjanst } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            to="/tjanster"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden /> Alla tjänster
          </Link>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-balance md:text-5xl">{tjanst.heading}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{tjanst.intro}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            {tjanst.sections.map((s) => (
              <article key={s.heading}>
                <h2 className="text-2xl">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-border/70 bg-card p-7 shadow-sm">
            <h2 className="text-lg">Det här ingår</h2>
            <ul className="mt-4 space-y-2.5">
              {tjanst.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7 w-full rounded-full">
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-4">
          <h2 className="text-xl">Andra tjänster</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {tjanster
              .filter((t) => t.slug !== tjanst.slug)
              .map((t) => (
                <Link
                  key={t.slug}
                  to="/tjanster/$slug"
                  params={{ slug: t.slug }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  {t.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
