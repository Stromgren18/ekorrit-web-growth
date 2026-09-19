import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Egen Supabase-klient för användarens eget projekt (inte Lovable Cloud).
 * Nycklarna sätts i miljövariablerna VITE_SUPABASE_URL och
 * VITE_SUPABASE_PUBLISHABLE_KEY. Saknas dem kör hela sajten i demoläge mot
 * de lokala innehållsfilerna.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!)
  : null;
