import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";

import { Logo } from "./Logo";
import { navigation, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-sage-dark text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="text-primary-foreground" />
          <p className="mt-4 text-sm text-primary-foreground/75">
            Auktoriserad redovisningsbyrå i Strömsund och Östersund. Vi kan ekonomi – räkna med oss.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ekorrit AB på Instagram"
              className="rounded-full border border-primary-foreground/25 p-2 transition-colors hover:bg-primary-foreground/10"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ekorrit AB på Facebook"
              className="rounded-full border border-primary-foreground/25 p-2 transition-colors hover:bg-primary-foreground/10"
            >
              <Facebook className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        {site.offices.map((office) => (
          <div key={office.id}>
            <h2 className="font-display text-base">{office.city}</h2>
            <address className="mt-3 space-y-1 text-sm not-italic text-primary-foreground/75">
              <p>{office.street}</p>
              <p>{office.postal}</p>
              <p>{office.phone}</p>
              <p>{office.email}</p>
              <p className="pt-2">{office.hours}</p>
            </address>
          </div>
        ))}

        <div>
          <h2 className="font-display text-base">Snabblänkar</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            {navigation.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-primary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/integritetspolicy" className="transition-colors hover:text-primary-foreground">
                Integritetspolicy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ekorrit AB. Alla rättigheter förbehållna.</p>
          <p>Org.nr {site.orgNumber}</p>
        </div>
      </div>
    </footer>
  );
}
