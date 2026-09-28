/**
 * Bilduppladdning till Supabase Storage-bucketen `media`.
 * Bilden komprimeras automatiskt först (se imageCompressor.ts).
 * I demoläget görs bilden till en data-URL som lever i minnet under sessionen.
 */
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { formateraStorlek, komprimeraBild } from "./imageCompressor";

export async function upladdaBild(
  original: File,
): Promise<{ url?: string; fel?: string; info?: string }> {
  const res = await komprimeraBild(original);
  const fil = res.fil;
  const info = res.komprimerad
    ? `Optimerad: ${formateraStorlek(res.foreBytes)} → ${formateraStorlek(res.efterBytes)} (−${Math.round((1 - res.efterBytes / res.foreBytes) * 100)} %)`
    : `Bilden var redan optimerad (${formateraStorlek(res.foreBytes)})`;

  if (isSupabaseConfigured && supabase) {
    const filtillägg = (fil.name.split(".").pop() ?? "jpg").toLowerCase();
    const sokvag = `bilder/${Date.now()}-${globalThis.crypto?.randomUUID?.() ?? nyttSlump()}.${filtillägg}`;
    const { error } = await supabase.storage.from("media").upload(sokvag, fil, {
      cacheControl: "31536000",
      contentType: fil.type,
      upsert: false,
    });
    if (error) return { fel: error.message };
    const { data } = supabase.storage.from("media").getPublicUrl(sokvag);
    return { url: data.publicUrl, info };
  }
  return new Promise((resolve) => {
    const lasare = new FileReader();
    lasare.onload = () => resolve({ url: String(lasare.result), info });
    lasare.onerror = () => resolve({ fel: "Kunde inte läsa filen." });
    lasare.readAsDataURL(fil);
  });
}

function nyttSlump() {
  return Math.random().toString(36).slice(2);
}
