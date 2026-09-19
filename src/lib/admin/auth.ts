/**
 * Admin-åtkomst. Två lägen:
 * - Supabase kopplat: inloggning via Supabase Auth + kontroll i tabellen
 *   `user_roles` (roll = 'admin').
 * - Demoläge: flagga i sessionStorage – sparningar lever bara i minnet
 *   tills databasen kopplas.
 */
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

const DEMO_FLAG = "ekorrit-admin-demo";

export function arAdminDemo(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(DEMO_FLAG) === "1";
}

export function oppnaDemoLaget(): void {
  window.sessionStorage.setItem(DEMO_FLAG, "1");
}

export function stangDemoLaget(): void {
  window.sessionStorage.removeItem(DEMO_FLAG);
}

export async function loggaIn(epost: string, losenord: string): Promise<{ ok: boolean; fel?: string }> {
  if (!supabase) return { ok: false, fel: "Supabase är inte kopplat än." };
  const { error } = await supabase.auth.signInWithPassword({ email: epost, password: losenord });
  if (error) return { ok: false, fel: error.message };
  const admin = await arAdmin();
  return admin ? { ok: true } : { ok: false, fel: "Kontot saknar admin-roll." };
}

export async function arAdmin(): Promise<boolean> {
  if (!supabase) return arAdminDemo();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  return !error && Boolean(data);
}

export async function hamtaSessionInfo(): Promise<{
  kopplat: boolean;
  inloggad: boolean;
  admin: boolean;
  epost?: string | undefined;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { kopplat: false, inloggad: arAdminDemo(), admin: arAdminDemo() };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { kopplat: true, inloggad: false, admin: false };
  const admin = await arAdmin();
  return { kopplat: true, inloggad: true, admin, epost: user.email ?? undefined };
}

export async function loggaUt(): Promise<void> {
  stangDemoLaget();
  if (supabase) await supabase.auth.signOut();
}
