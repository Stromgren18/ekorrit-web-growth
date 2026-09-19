/**
 * Bilduppladdning till Supabase Storage-bucketen `media`.
 * I demoläget görs bilden till en data-URL som lever i minnet under sessionen.
 */
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

export async function upladdaBild(fil: File): Promise<{ url?: string; fel?: string }> {
  if (isSupabaseConfigured && supabase) {
    const filtillägg = (fil.name.split(".").pop() ?? "jpg").toLowerCase();
    const sokvag = `bilder/${Date.now()}-${globalThis.crypto?.randomUUID?.() ?? nyttSlump()}.${filtillägg}`;
    const { error } = await supabase.storage.from("media").upload(sokvag, fil, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) return { fel: error.message };
    const { data } = supabase.storage.from("media").getPublicUrl(sokvag);
    return { url: data.publicUrl };
  }
  // Demoläge: data-URL i minnet (försvinner vid omladdning)
  return new Promise((resolve) => {
    const lasare = new FileReader();
    lasare.onload = () => resolve({ url: String(lasare.result) });
    lasare.onerror = () => resolve({ fel: "Kunde inte läsa filen." });
    lasare.readAsDataURL(fil);
  });
}

function nyttSlump() {
  return Math.random().toString(36).slice(2);
}
