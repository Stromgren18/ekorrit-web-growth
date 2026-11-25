import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/Sections";
import { localPages, type LocalPage } from "@/content/local-pages";
import { site as defaultSite } from "@/content/site";
import { tjanster } from "@/content/tjanster";
import { useSite } from "@/lib/content/site";

export function LocalLandingPage({ page }: { page: LocalPage }) {
  const site = useSite();
  const office = site.offices.find((item) => item.city === page.city)
    ?? defaultSite.offices.find((item) => item.city === page.city);
  const phone = office?.phone || site.phone;
  const email = office?.email || site.email;
  const other = page.city === "Strömsund" ? localPages.ostersund : localPages.stromsund;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-sage-dark text-primary-foreground">
        <img src="/images/hero-team.jpg" alt="" width={1920} height={1080} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="hero-overlay absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-medium">Ekorrit AB · {page.city}</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">Redovisningsbyrå i {page.city}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href={`tel:${phone.replace(/\s/g, "")}`}><Phone className="size-4" aria-hidden />Ring oss</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={`mailto:${email}?subject=${encodeURIComponent(`Kontakt med Ekorrit – ${page.city}`)}`}><Mail className="size-4" aria-hidden />Boka ett möte</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={`Ekonomi i ${page.city}`} title={page.heading} />
            {page.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 leading-relaxed text-muted-foreground">{paragraph}</p>)}
            <Button asChild variant="link" className="mt-5 h-auto px-0 text-base"><Link to="/medarbetare">Lär känna personerna bakom siffrorna<ArrowRight className="size-4" aria-hidden /></Link></Button>
          </div>
          <div className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <h2 className="text-2xl">Träffa oss i {page.city}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{page.visit}</p>
            <address className="mt-6 space-y-5 text-sm not-italic">
              {office && <div className="flex gap-3"><MapPin className="size-5 shrink-0 text-primary" aria-hidden /><div>{office.street}<br />{office.postal}<br /><a className="mt-2 inline-block text-primary underline underline-offset-4" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.street}, ${office.postal}`)}`} target="_blank" rel="noopener noreferrer">Visa vägbeskrivning</a></div></div>}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:underline"><Phone className="size-5 shrink-0 text-primary" aria-hidden />{phone}</a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 break-all hover:underline"><Mail className="size-5 shrink-0 text-primary" aria-hidden />{email}</a>
            </address>
            <Button asChild className="mt-7 rounded-full"><Link to="/kontakt">Skriv till oss<ArrowRight className="size-4" aria-hidden /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={`Ekonomihjälp för ditt företag i ${page.city}`} intro="Vi anpassar uppdraget efter din verksamhet – från enstaka frågor till ett löpande samarbete." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tjanster.map((service, index) => <Link key={service.slug} to="/tjanster/$slug" params={{ slug: service.slug }} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-ring">
              <h3 className="text-xl">{service.title}</h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">{page.services[index]}</p>
              <span className="mt-auto flex items-center gap-2 text-sm font-medium text-primary">Läs mer<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden /></span>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="section-y bg-sage-dark text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl">Låt oss prata om ditt företag</h2>
          <p className="mt-5 leading-relaxed text-primary-foreground/85">Berätta vad du behöver hjälp med, eller hur du vill att samarbetet med din redovisningsbyrå ska fungera. Vi tar det därifrån.</p>
          <Button asChild size="lg" variant="secondary" className="mt-7 rounded-full"><Link to="/kontakt">Kontakta Ekorrit<ArrowRight className="size-4" aria-hidden /></Link></Button>
          <p className="mt-8 text-sm text-primary-foreground/80">Letar du efter oss i {other.city}? <Link to={other.path} className="underline underline-offset-4">Läs om Ekorrit i {other.city}</Link></p>
        </div>
      </section>
    </>
  );
}