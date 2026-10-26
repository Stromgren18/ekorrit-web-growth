/**
 * Admin-API: läsa/skriva rader och JSON-inställningar.
 * Supabase om kopplat, annars muteras demoläget i minnet (session).
 */
import { useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { demoStore } from "@/lib/demoStore";
import { SIDOR, SIDOR_NYCKLAR } from "@/content/sidor";
import type { Sektion } from "./sections";

export type Rad = Record<string, unknown> & { id: string };

const nyttId = () =>
  globalThis.crypto?.randomUUID?.() ?? `demo-${Date.now()}-${Math.round(Math.random() * 1e6)}`;

/** Läser alla rader för en tabellsektion (Supabase eller demoläge). */
export async function listaRader(sektion: Sektion): Promise<Rad[]> {
  const tabell = sektion.tabell!;
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from(tabell).select("*");
      if (!error && data) {
        const rader = data as Rad[];
        if (tabell === "kontaktmeddelanden")
          rader.sort((a, b) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")));
        return rader;
      }
    } catch {
      /* faller tillbaka till demoläget */
    }
  }
  const kalla = demoStore[tabell as keyof typeof demoStore] as unknown as Rad[];
  return kalla ? [...kalla] : [];
}

/** Sparar en rad: uppdaterar befintlig eller skapar ny. */
export async function sparaRad(
  sektion: Sektion,
  rad: Rad,
  nyRad: boolean,
): Promise<{ ok: boolean; fel?: string }> {
  const tabell = sektion.tabell!;
  if (isSupabaseConfigured && supabase) {
    try {
      const { id, ...falt } = rad;
      const { error } = nyRad
        ? await supabase.from(tabell).insert(falt)
        : await supabase.from(tabell).update(falt).eq("id", id);
      return error ? { ok: false, fel: error.message } : { ok: true };
    } catch (e) {
      return { ok: false, fel: e instanceof Error ? e.message : "Okänt fel" };
    }
  }
  // Demoläge: mutera i minnet
  const kalla = demoStore[tabell as keyof typeof demoStore] as unknown as Rad[];
  if (nyRad) {
    kalla.push({ ...rad, id: rad.id || nyttId() });
  } else {
    const i = kalla.findIndex((r) => r.id === rad.id);
    if (i >= 0) kalla[i] = { ...kalla[i], ...rad };
  }
  return { ok: true };
}

export async function taBortRad(sektion: Sektion, id: string): Promise<{ ok: boolean; fel?: string }> {
  const tabell = sektion.tabell!;
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(tabell).delete().eq("id", id);
    return error ? { ok: false, fel: error.message } : { ok: true };
  }
  const kalla = demoStore[tabell as keyof typeof demoStore] as unknown as Rad[];
  const i = kalla.findIndex((r) => r.id === id);
  if (i >= 0) kalla.splice(i, 1);
  return { ok: true };
}

/** Läser en JSON-sektion (`sidor`-vald sida eller `site`). */
export async function hamtaJson(sektion: Sektion, nyckel: string): Promise<Record<string, unknown>> {
  if (sektion.sidnyckel === "site") {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from("site_installningar")
          .select("value")
          .eq("key", "site")
          .maybeSingle();
        if (data) {
          const rad = data as unknown as { value: Record<string, unknown> };
          if (rad?.value) return rad.value;
        }
      } catch {
        /* faller tillbaka */
      }
    }
    return demoStore.site as unknown as Record<string, unknown>;
  }
  // sidor
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from("sidor")
        .select("content")
        .eq("page", nyckel)
        .maybeSingle();
      if (data) {
        const rad = data as unknown as { content: Record<string, unknown> };
        if (rad?.content) return rad.content;
      }
    } catch {
      /* faller tillbaka */
    }
  }
  return (demoStore.sidor[nyckel] ?? SIDOR[nyckel] ?? {}) as Record<string, unknown>;
}

export async function sparaJson(
  sektion: Sektion,
  nyckel: string,
  varde: Record<string, unknown>,
): Promise<{ ok: boolean; fel?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const tabell = sektion.sidnyckel === "site" ? "site_installningar" : "sidor";
      const nyckelKolumn = sektion.sidnyckel === "site" ? "key" : "page";
      const vardeKolumn = sektion.sidnyckel === "site" ? "value" : "content";
      const { error } = await supabase
        .from(tabell)
        .upsert({ [nyckelKolumn]: nyckel, [vardeKolumn]: varde }, { onConflict: nyckelKolumn });
      return error ? { ok: false, fel: error.message } : { ok: true };
    } catch (e) {
      return { ok: false, fel: e instanceof Error ? e.message : "Okänt fel" };
    }
  }
  if (sektion.sidnyckel === "site") {
    demoStore.site = { ...demoStore.site, ...varde } as typeof demoStore.site;
  } else {
    demoStore.sidor[nyckel] = varde;
  }
  return { ok: true };
}

export const sidNycklar = SIDOR_NYCKLAR;

/** Ogiltigförklarar så att sajten visar ändringarna direkt. */
export function useUppdateraSajt() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries();
}
