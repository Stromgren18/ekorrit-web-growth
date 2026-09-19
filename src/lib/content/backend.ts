/**
 * Gemensam hämtning: Supabase om kopplat, annars lokalt demoläge.
 * Fel vid hämtning faller alltid tillbaka till demoläget så att sidorna
 * aldrig blir tomma.
 */
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

export async function hamtaTabell<T>(
  tabell: string,
  fallback: T[],
  orderBy?: string,
): Promise<T[]> {
  if (!isSupabaseConfigured || !supabase) return fallback;
  try {
    let query = supabase.from(tabell).select("*");
    if (orderBy) query = query.order(orderBy);
    const { data, error } = await query;
    if (error || !data) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}

export async function hamtaJsonRad(
  tabell: "sidor" | "site_installningar",
  nyckelKolumn: "page" | "key",
  vardeKolumn: "content" | "value",
  nyckel: string,
): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from(tabell)
      .select(vardeKolumn)
      .eq(nyckelKolumn, nyckel)
      .maybeSingle();
    if (error || !data) return null;
    const rad = data as unknown as Record<string, unknown>;
    const varde = rad[vardeKolumn];
    return varde && typeof varde === "object" ? (varde as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
