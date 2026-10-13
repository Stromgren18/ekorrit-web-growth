import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Egen Supabase-klient för användarens eget projekt (inte Lovable Cloud).
 * Adress och publik nyckel läses från hemligheterna SUPA_URL / SUPA_ANON_KEY
 * (servern skickar dem till webbläsaren via window.__SUPA__ i sidhuvudet),
 * med VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY som reserv.
 * Saknas de körs sajten i demoläge.
 */
export type PublikSupabaseConfig = { url?: string | undefined; key?: string | undefined };

export function lasPublikConfig(): PublikSupabaseConfig {
  if (typeof window !== "undefined") {
    const w = (window as unknown as { __SUPA__?: PublikSupabaseConfig }).__SUPA__;
    if (w?.url && w?.key) return w;
  } else if (typeof process !== "undefined" && process.env) {
    const url = process.env["SUPA_URL"];
    const key = process.env["SUPA_ANON_KEY"];
    if (url && key) return { url, key };
  }
  return {
    url: import.meta.env["VITE_SUPABASE_URL"] as string | undefined,
    key: import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined,
  };
}

const { url, key } = lasPublikConfig();

export const isSupabaseConfigured = Boolean(url && key);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, key!)
  : null;
