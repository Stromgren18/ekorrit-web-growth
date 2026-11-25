import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localPages, type LocalCity } from "@/content/local-pages";
import { useSite } from "@/lib/content/site";

const services = [
  { slug: "bokforing", title: "Löpande bokföring", body: "Ordning på underlag, moms och redovisning. Vi hjälper dig att skapa rutiner som fungerar i vardagen." },
  { slug: "arsredovisning-bokslut", title: "Bokslut & årsredovisning", body: "Samla året och få en tydlig bild av företagets ekonomi. Vi hjälper till med bokslut och årsredovisning." },
  { slug: "lonehantering", title: "Lönehantering", body: "Stöd med löner, lönebesked och arbetsgivardeklarationer, anpassat efter din verksamhet." },
  { slug: "radgivning", title: "Ekonomisk rådgivning", body: "Prata om lönsamhet, planering och nästa steg. Vi gör ekonomin begriplig inför dina beslut." },
] as const;

export function LocalOfficePage({ city }: { city: LocalCity }) {
  const page = localPages[city];
  const site = useSite();
  const office = site.offices.find((item) => item.id === city);
  const phone = office?.phone || site.phone;
  const email = office?.email || site.email;
  const emailLink = `mailto:${email}?subject=${encodeURIComponent(`Kontakt med Ekorrit – ${page.city}`)}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-sage-dark text-primary-foreground">
        <img src="/images/hero-team.jpg" alt="" width={1920} height={1080} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="mb-5 text-sm font-medium">Ekorrit AB · {page.city}</p>
          <h1 className="max-w-2xl text-4xl leading-tight md:text-5xl lg:text-6xl">Redovisningsbyrå i {page.city}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><a href={`tel:${phone.replace(/\s/g, "")}`}><Phone aria-hidden />Ring oss</a></Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full"><a href={emailLink}><Mail aria-hidden />Boka ett möte</a></Button>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="mb-3 text-sm font-medium text-primary">Personlig kontakt, lokal förankring</p>
            <h2 className="text-3xl md:text-4xl">{page.heading}</h2>
            {page.paragraphs.map((text) => <p key={text} className="mt-5 leading-relaxed text-muted-foreground">{text}</p>)}
            <Button asChild variant="link" className="mt-5 h-auto px-0"><Link to="/medarbetare">Lär känna vårt team<ArrowRight aria-hidden /></Link></Button>
          </div>
          <aside className="self-start border-l-2 border-primary/30 pl-6 md:pl-8" aria-label={`Kontakta Ekorrit i ${page.city}`}>
            <h2 className="text-2xl">Kontakta oss i {page.city}</h2>
            <p className="mt-2 text-sm text-primary">{office?.role}</p>
            <address className="mt-6 space-y-5 not-italic">
              {office && <div className="flex gap-3"><MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden /><p>{office.street}<br />{office.postal}</p></div>}
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:underline"><Phone className="size-5 shrink-0 text-primary" aria-hidden />{phone}</a>
              <a href={emailLink} className="flex items-center gap-3 break-all hover:underline"><Mail className="size-5 shrink-0 text-primary" aria-hidden />{email}</a>
            </address>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{page.visit}</p>
            {office && <Button asChild variant="outline" className="mt-6 rounded-full"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.street}, ${office.postal}`)}`} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden />Hitta till kontoret</a></Button>}
          </aside>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">Ekonomihjälp för företag i {page.city}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{page.servicesIntro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => <article key={service.slug} className="flex flex-col rounded-2xl border border-border/70 bg-card p-6">
              <h3 className="text-xl">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              <Button asChild variant="link" className="mt-5 justify-start px-0"><Link to="/tjanster/$slug" params={{ slug: service.slug }} aria-label={`Läs mer om ${service.title.toLowerCase()}`}>Läs mer<ArrowRight aria-hidden /></Link></Button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section-y bg-sage-dark text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl text-3xl md:text-4xl">Ska vi prata om ditt företag?</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/80">Berätta vad du vill få hjälp med. Vi börjar med ett samtal om din verksamhet och vilket stöd som passar dig.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg" className="rounded-full"><Link to="/kontakt">Kontakta Ekorrit<ArrowRight aria-hidden /></Link></Button>
            <Button asChild variant="secondary" size="lg" className="rounded-full"><a href={emailLink}><Mail aria-hidden />Mejla oss</a></Button>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/80">Vi finns också i <Link to={page.otherPath} className="underline underline-offset-4">{page.otherCity}</Link>.</p>
        </div>
      </section>
    </>
  );
}