/** Byt kropparna mot Supabase-anrop mot tabellen `faq` när databasen kopplas. */
import { faq, type FaqPost } from "@/content/faq";

export function getFaq(): FaqPost[] {
  return [...faq].sort((a, b) => a.sort_order - b.sort_order);
}
