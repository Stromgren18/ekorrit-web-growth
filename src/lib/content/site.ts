import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { SiteContent } from "@/lib/demoStore";
import { demoStore } from "@/lib/demoStore";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { appliceraJsonUtkast } from "@/lib/admin/preview";
import { hamtaJsonRad } from "./backend";

/** Supabase-tabellen `site_installningar` (raden key='site') om kopplad, annars demoläget. */
export const siteQuery = () =>
  queryOptions({
    queryKey: ["site"],
    initialData: demoStore.site,
    queryFn: async () => {
      let data = demoStore.site;
      if (isSupabaseConfigured && supabase) {
        const db = await hamtaJsonRad("site_installningar", "key", "value", "site");
        if (db) data = { ...demoStore.site, ...db } as SiteContent;
      }
      return data;
    },
    select: (data: SiteContent) => appliceraJsonUtkast("site", "site", data),
  });

export function useSite(): SiteContent {
  const { data } = useSuspenseQuery(siteQuery());
  return data;
}
