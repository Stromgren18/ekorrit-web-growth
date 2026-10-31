import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Facebook, Instagram, Lock, Mail, Menu, Phone } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/ekorrit-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { headerNavigation } from "@/content/site";
import { useSite } from "@/lib/content/site";

export function Header() {
  const site = useSite();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

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
        <Link to="/" aria-label="Ekorrit AB – till startsidan" className="shrink-0">
          <img
            src={logoAsset.url}
            alt="Ekorrit – ekonomi & rådgivning"
            width={279}
            height={113}
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Huvudmeny" className="ml-auto hidden items-center gap-1 xl:flex">
          {headerNavigation.map((item) => "children" in item ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`gap-1.5 rounded-full px-3 text-sm ${item.children.some((child) => isActive(child.to)) ? "bg-secondary text-primary" : "text-foreground/80"}`}>
                  {item.label}<ChevronDown className="size-3.5" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10} className="min-w-52 p-2">
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.to} asChild>
                    <Link to={child.to} activeProps={{ className: "bg-secondary text-primary" }} className="cursor-pointer px-3 py-2.5">{child.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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

        <Sheet open={open} onOpenChange={(value) => { setOpen(value); if (!value) setExpanded(null); }}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full xl:hidden" aria-label="Öppna meny">
              <Menu className="size-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[19rem] overflow-y-auto">
            <SheetTitle className="px-4 pt-4 font-display text-lg">Meny</SheetTitle>
            <nav aria-label="Mobilmeny" className="mt-2 flex flex-col gap-1 p-4">
              {headerNavigation.map((item) => "children" in item ? (
                <div key={item.label}>
                  <Button
                    variant="ghost"
                    aria-expanded={expanded === item.label}
                    aria-controls={`mobile-${item.children[0].to.slice(1)}`}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className={`h-auto w-full justify-between whitespace-normal rounded-full px-4 py-2.5 text-left text-base ${item.children.some((child) => isActive(child.to)) ? "bg-secondary text-primary" : ""}`}
                  >
                    {item.label}<ChevronDown className={`size-4 shrink-0 transition-transform motion-reduce:transition-none ${expanded === item.label ? "rotate-180" : ""}`} aria-hidden />
                  </Button>
                  {expanded === item.label && (
                    <div id={`mobile-${item.children[0].to.slice(1)}`} className="my-2 ml-5 flex flex-col gap-1 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link key={child.to} to={child.to} onClick={() => { setOpen(false); setExpanded(null); }} activeProps={{ className: "bg-secondary text-primary" }} className="rounded-full px-3 py-2.5 text-sm transition-colors hover:bg-secondary">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              <Button asChild className="mt-4 rounded-full">
                <Link to="/kontakt" onClick={() => setOpen(false)}>Kontakta oss</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
