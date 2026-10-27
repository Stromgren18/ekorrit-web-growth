import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Quote } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/site/Sections";
import { kundreferenserQuery } from "@/lib/content/kundreferenser";
import { caseSlug } from "@/content/kundreferenser";

const BAS = "https://ekorrit.lovable.app/kundreferenser";

const TJANST_LANK: Record<string, string> = {
  Bokföring: "bokforing",
  "Årsredovisning & bokslut": "arsredovisning-bokslut",
  Lönehantering: "lonehantering",
  Rådgivning: "radgivning",
};

export const Route = createFileRoute("/kundreferenser/$slug")({
  loader: async ({ context, params }) => {
    const rader = await context.queryClient.ensureQueryData(kundreferenserQuery());
    const c = rader.find((r) => caseSlug(r) === params.slug);
    if (!c) throw notFound();
    return { title: c.company_name, excerpt: c.excerpt ?? c.quote, image: c.image_url };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.title} – kundcase | Ekorrit AB` : "Kundcase | Ekorrit AB";
    const desc = loaderData?.excerpt ?? "Kundcase från Ekorrit AB.";
    const url = `${BAS}/${params.slug}`;
    const img = loaderData?.image?.startsWith("https://") ? loaderData.image : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CasePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl">Caset hittades inte</h1>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/kundreferenser">Till alla kundcase</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl">Något gick fel</h1>
      <p className="mt-2 text-muted-foreground">{error instanceof Error ? error.message : ""}</p>
    </div>
  ),
});

function Stycken({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
      ))}
    </>
  );
}

function CasePage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(kundreferenserQuery());
  const c = data.find((r) => caseSlug(r) === slug);
  if (!c) return null;
  const fler = data.filter((r) => r.challenge && r.id !== c.id).slice(0, 3);

  const block = [
    { rubrik: "Utmaningen", text: c.challenge },
    { rubrik: "Så hjälpte vi till", text: c.solution },
    { rubrik: "Resultatet", text: c.result },
  ].filter((b) => b.text);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-sage-dark text-primary-foreground">
        {c.image_url ? (
          <img src={c.image_url} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-30" />
        ) : null}
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Link to="/kundreferenser" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="size-4" /> Alla kundcase
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            Kundcase{c.industry ? ` · ${c.industry}` : ""}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight text-balance md:text-5xl">{c.company_name}</h1>
          {c.excerpt ? <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">{c.excerpt}</p> : null}
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10">
            {block.map((b, i) => (
              <div key={b.rubrik}>
                <p className="text-sm font-semibold text-primary">0{i + 1}</p>
                <h2 className="text-2xl md:text-3xl">{b.rubrik}</h2>
                <Stycken text={b.text!} />
              </div>
            ))}
            <figure className="rounded-2xl bg-secondary/60 p-8">
              <Quote className="size-7 text-primary" aria-hidden />
              <blockquote className="mt-4 font-display text-xl leading-relaxed md:text-2xl">”{c.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{c.client_name}</span>, {c.company_name}
              </figcaption>
            </figure>
          </div>

          <aside className="h-fit rounded-2xl border border-border/70 bg-card p-6 shadow-sm lg:sticky lg:top-28">
            {c.logo_url ? <img src={c.logo_url} alt={c.company_name} className="mb-4 h-10 w-auto" /> : null}
            <dl className="space-y-4 text-sm">
              {c.industry ? (
                <div><dt className="text-muted-foreground">Bransch</dt><dd className="font-semibold">{c.industry}</dd></div>
              ) : null}
              {c.location ? (
                <div>
                  <dt className="text-muted-foreground">Ort</dt>
                  <dd className="flex items-center gap-1 font-semibold"><MapPin className="size-3.5" /> {c.location}</dd>
                </div>
              ) : null}
              {c.services?.length ? (
                <div>
                  <dt className="text-muted-foreground">Tjänster</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {c.services.map((s) =>
                      TJANST_LANK[s] ? (
                        <Link key={s} to="/tjanster/$slug" params={{ slug: TJANST_LANK[s] }} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                          {s}
                        </Link>
                      ) : (
                        <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{s}</span>
                      ),
                    )}
                  </dd>
                </div>
              ) : null}
            </dl>
            <Button asChild className="mt-6 w-full rounded-full">
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </aside>
        </div>
      </section>

      {fler.length ? (
        <section className="section-y bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl">Fler kundcase</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {fler.map((f) => (
                <Link key={f.id} to="/kundreferenser/$slug" params={{ slug: caseSlug(f) }} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <span className="text-xs font-semibold text-primary">{f.industry}</span>
                  <h3 className="mt-2 text-lg">{f.company_name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{f.excerpt ?? f.quote}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
