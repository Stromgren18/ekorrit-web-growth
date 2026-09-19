import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { SiteContent } from "@/lib/demoStore";
import { demoStore } from "@/lib/demoStore";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { hamtaJsonRad } from "./backend";

/** Supabase-tabellen `site_installningar` (raden key='site') om kopplad, annars demoläget. */
export const siteQuery = () =>
  queryOptions({
    queryKey: ["site"],
    initialData: demoStore.site,
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return demoStore.site;
      const db = await hamtaJsonRad("site_installningar", "key", "value", "site");
      return db ? ({ ...demoStore.site, ...db } as SiteContent) : demoStore.site;
    },
  });

export function useSite(): SiteContent {
  const { data } = useSuspenseQuery(siteQuery());
  return data;
}
