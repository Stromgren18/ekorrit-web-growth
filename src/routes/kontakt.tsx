import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/site/Sections";
import { siteQuery, useSite } from "@/lib/content/site";
import { useSida } from "@/lib/content/sidor";
import { SIDOR, type HeroSida } from "@/content/sidor";
import { demoStore, type SiteContent } from "@/lib/demoStore";

const demoSite: SiteContent = demoStore.site;


const KONTAKT_FALLBACK = SIDOR["kontakt"] as unknown as HeroSida;

const TITLE = "Kontakta Ekorrit – Strömsund eller digitalt";
const DESCRIPTION =
  "Kontakta Ekorrits huvudkontor i Strömsund eller boka ett digitalt möte. Obemannat lokalkontor finns i Östersund för besök efter överenskommelse.";

export const Route = createFileRoute("/kontakt")({
  loader: async ({ context }) => {
    const site = await context.queryClient.ensureQueryData(siteQuery());
    return { site };
  },
  head: ({ loaderData }) => {
    const site = (loaderData?.site as unknown as SiteContent | undefined) ?? demoSite;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/kontakt" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/kontakt" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            name: site.name,
            telephone: site.phone,
            email: site.email,
            address: site.offices.map((o) => ({
              "@type": "PostalAddress",
              streetAddress: o.street,
              postalCode: o.postal.split(" ")[0],
              addressLocality: o.city,
              addressCountry: "SE",
            })),
          }),
        },
      ],
    };
  },
  component: KontaktPage,
});


const TJANSTER = [
  "Löpande bokföring",
  "Bokslut & årsredovisning",
  "Lönehantering",
  "Rådgivning",
  "Byta redovisningsbyrå",
  "Annat",
] as const;

const formSchema = z.object({
  namn: z.string().trim().min(1, "Fyll i ditt namn").max(100),
  foretag: z.string().trim().max(150),
  epost: z.string().trim().email("Ange en giltig e-postadress").max(255),
  telefon: z.string().trim().max(40),
  tjanst: z.string().min(1).max(80),
  kontor: z.string().min(1).max(80),
  meddelande: z.string().trim().min(1, "Skriv ett kort meddelande").max(3000, "Max 3000 tecken"),
  samtycke: z.literal(true, { errorMap: () => ({ message: "Du behöver godkänna villkoren" }) }),
});

function KontaktPage() {
  const site = useSite();
  const sida = useSida<HeroSida>("kontakt", KONTAKT_FALLBACK);
  const [skickat, setSkickat] = useState(false);
  const [arende, setArende] = useState("Digitalt eller allmänt");
  const [tjanst, setTjanst] = useState<string>(TJANSTER[0]);
  const [samtycke, setSamtycke] = useState(false);
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  const skicka = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFel(null);
    const f = new FormData(e.currentTarget);
    const res = formSchema.safeParse({
      namn: f.get("namn") ?? "",
      foretag: f.get("foretag") ?? "",
      epost: f.get("epost") ?? "",
      telefon: f.get("telefon") ?? "",
      tjanst,
      kontor: arende,
      meddelande: f.get("meddelande") ?? "",
      samtycke,
    });
    if (!res.success) {
      setFel(res.error.issues[0]?.message ?? "Kontrollera fälten");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setFel(`Formuläret är inte aktiverat ännu. Mejla oss på ${site.email} eller ring ${site.phone}.`);
      return;
    }
    setSkickar(true);
    const d = res.data;
    const { error } = await supabase.from("kontaktmeddelanden").insert({
      ...d,
      foretag: d.foretag || null,
      telefon: d.telefon || null,
    });
    setSkickar(false);
    if (error) {
      setFel(`Det gick inte att skicka just nu. Mejla oss på ${site.email} eller ring ${site.phone}.`);
      return;
    }
    setSkickat(true);
    setSamtycke(false);
  };

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
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            {site.offices.map((office) => (
              <div key={office.id} className="rounded-2xl border border-border/70 bg-card p-7 shadow-sm">
                <h2 className="text-xl">{office.city}</h2>
                <p className="mt-1 text-xs font-medium text-primary">{office.role}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <dd>
                      {office.street}
                      <br />
                      {office.postal}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <dd>
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:underline">
                        {office.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <dd>
                      <a href={`mailto:${office.email}`} className="hover:underline">
                        {office.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-7 shadow-sm md:p-9">
            <h2 className="text-xl">Skicka ett meddelande</h2>
            {skickat ? (
              <div
                role="status"
                className="mt-6 rounded-2xl bg-secondary p-6 text-sm leading-relaxed"
              >
                <p className="font-semibold text-foreground">Tack för ditt meddelande!</p>
                <p className="mt-1.5 text-muted-foreground">
                  Vi har tagit emot ditt meddelande och återkommer så snart vi kan.
                </p>
                <Button
                  variant="outline"
                  className="mt-5 rounded-full bg-background"
                  onClick={() => setSkickat(false)}
                >
                  Skicka ett till
                </Button>
              </div>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={skicka}
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="namn">Namn</Label>
                    <Input id="namn" name="namn" required autoComplete="name" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foretag">Företag</Label>
                    <Input id="foretag" name="foretag" autoComplete="organization" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="epost">E-post</Label>
                    <Input
                      id="epost"
                      name="epost"
                      type="email"
                      required
                      autoComplete="email"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input id="telefon" name="telefon" type="tel" autoComplete="tel" className="rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tjanst">Vad är du intresserad av?</Label>
                  <Select value={tjanst} onValueChange={setTjanst}>
                    <SelectTrigger id="tjanst" className="w-full rounded-xl">
                      <SelectValue placeholder="Välj tjänst" />
                    </SelectTrigger>
                    <SelectContent>
                      {TJANSTER.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arende">Kontor</Label>
                  <Select value={arende} onValueChange={setArende}>
                    <SelectTrigger id="arende" className="w-full rounded-xl">
                      <SelectValue placeholder="Välj ärende" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strömsund">Strömsund</SelectItem>
                      <SelectItem value="Östersund – besök efter överenskommelse">
                        Östersund – besök efter överenskommelse
                      </SelectItem>
                      <SelectItem value="Digitalt eller allmänt">Digitalt eller allmänt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meddelande">Meddelande</Label>
                  <Textarea id="meddelande" name="meddelande" required maxLength={3000} rows={5} className="rounded-xl" />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="samtycke"
                    checked={samtycke}
                    onCheckedChange={(v) => setSamtycke(v === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="samtycke" className="text-sm font-normal leading-relaxed text-muted-foreground">
                    Jag godkänner att Ekorrit sparar mina uppgifter för att kunna besvara mitt meddelande, enligt{" "}
                    <a href="/integritetspolicy" className="text-primary underline underline-offset-2">
                      integritetspolicyn
                    </a>
                    .
                  </Label>
                </div>

                {fel && (
                  <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                    {fel}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={skickar} className="w-full rounded-full">
                  {skickar ? "Skickar…" : "Skicka meddelande"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
