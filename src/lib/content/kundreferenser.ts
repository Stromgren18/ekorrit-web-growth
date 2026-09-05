/** Byt kropparna mot Supabase-anrop mot tabellen `kundreferenser` när databasen kopplas. */
import { kundreferenser, type Kundreferens } from "@/content/kundreferenser";

export function getKundreferenser(): Kundreferens[] {
  return kundreferenser;
}

export function getFeaturedKundreferenser(): Kundreferens[] {
  return kundreferenser.filter((k) => k.is_featured);
}
