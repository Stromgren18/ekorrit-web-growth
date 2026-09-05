/**
 * Enda stället som behöver bytas när Supabase kopplas in manuellt.
 * Ersätt kropparna med anrop mot tabellen `aktuellt`.
 */
import { aktuellt, type Artikel } from "@/content/aktuellt";

const sorted = () =>
  [...aktuellt].sort((a, b) => (a.published_at < b.published_at ? 1 : -1));

export function getAktuellt(): Artikel[] {
  return sorted();
}

export function getSenasteAktuellt(limit = 3): Artikel[] {
  return sorted().slice(0, limit);
}

export function getArtikel(slug: string): Artikel | undefined {
  return aktuellt.find((a) => a.slug === slug);
}
