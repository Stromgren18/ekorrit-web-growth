import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

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
import { site } from "@/content/site";

const TITLE = "Kontakta Ekorrit – Strömsund eller digitalt";
const DESCRIPTION =
  "Kontakta Ekorrits huvudkontor i Strömsund eller boka ett digitalt möte. Obemannat lokalkontor finns i Östersund för besök efter överenskommelse.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
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
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [skickat, setSkickat] = useState(false);
  const [arende, setArende] = useState("Digitalt eller allmänt");

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            as="h1"
            eyebrow="Kontakt"
            title="Vi lär gärna känna ditt företag"
            intro="Ring, mejla eller skicka ett meddelande. Vi träffas på huvudkontoret i Strömsund eller digitalt, och i Östersund efter överenskommelse."
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
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <dd>{office.hours}</dd>
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
                  Vi har tagit emot din förfrågan till {arende} och återkommer så snart vi kan.
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
                onSubmit={(e) => {
                  e.preventDefault();
                  setSkickat(true);
                }}
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
                  <Label htmlFor="arende">Ärendet gäller</Label>
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
                  <Textarea id="meddelande" name="meddelande" required rows={5} className="rounded-xl" />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full">
                  Skicka meddelande
                </Button>
                <p className="text-xs text-muted-foreground">
                  Vi behandlar dina uppgifter enligt vår integritetspolicy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
