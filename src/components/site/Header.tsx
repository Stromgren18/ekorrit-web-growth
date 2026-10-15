import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Lock, Mail, Menu, Phone } from "lucide-react";
import { useState } from "react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigation } from "@/content/site";
import { useSite } from "@/lib/content/site";

export function Header() {
  const site = useSite();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="bg-sage-dark text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5" aria-hidden /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:underline sm:inline-flex">
              <Mail className="size-3.5" aria-hidden /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors hover:bg-primary-foreground/10"
            >
              <Lock className="size-3.5" aria-hidden /> Admin
            </Link>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ekorrit AB på Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ekorrit AB på Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <Facebook className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5">
        <Link to="/" aria-label="Ekorrit AB – till startsidan">
          <Logo />
        </Link>

        <nav aria-label="Huvudmeny" className="ml-auto hidden items-center gap-1 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild className="ml-auto rounded-full xl:ml-2">
          <Link to="/kontakt">Kontakta oss</Link>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full xl:hidden" aria-label="Öppna meny">
              <Menu className="size-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[19rem]">
            <SheetTitle className="px-4 pt-4 font-display text-lg">Meny</SheetTitle>
            <nav aria-label="Mobilmeny" className="mt-2 flex flex-col gap-1 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-secondary text-primary" }}
                  className="rounded-full px-4 py-2.5 text-base transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
