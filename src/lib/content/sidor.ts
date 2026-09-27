import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { demoStore } from "@/lib/demoStore";
import { appliceraJsonUtkast } from "@/lib/admin/preview";
import { hamtaJsonRad } from "./backend";

/** Supabase-tabellen `sidor` (page + content jsonb) om kopplad, annars demoläget. */
export const sidaQuery = (page: string) =>
  queryOptions({
    queryKey: ["sidor", page],
    initialData: demoStore.sidor[page] ?? {},
    queryFn: async () => {
      const db = await hamtaJsonRad("sidor", "page", "content", page);
      return db ?? demoStore.sidor[page] ?? {};
    },
    select: (data: Record<string, unknown>) => appliceraJsonUtkast("sidor", page, data),
  });

/** Slår ihop sparat innehåll med standardvärdena så att saknade fält är trygga. */
export function useSida<T extends object>(page: string, fallback: T): T {
  const { data } = useSuspenseQuery(sidaQuery(page));
  return { ...fallback, ...data } as T;
}
