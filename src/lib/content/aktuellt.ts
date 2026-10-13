import { queryOptions } from "@tanstack/react-query";
import type { Artikel } from "@/content/aktuellt";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

/**
 * Dubbelmode: Supabase-tabellen `aktuellt` om kopplad, annars demoläget.
 * Byt endast här när datakällan ändras.
 */
export const sorteraAktuellt = (lista: Artikel[]) =>
  [...lista].sort((a, b) => (a.published_at < b.published_at ? 1 : -1));

export const aktuelltQuery = () =>
  queryOptions({
    queryKey: ["aktuellt"],
    placeholderData: sorteraAktuellt(demoStore.aktuellt),
    queryFn: async () =>
      sorteraAktuellt(
        await hamtaTabell<Artikel>("aktuellt", demoStore.aktuellt, "published_at"),
      ),
    select: (data) => appliceraUtkast("aktuellt", data),
  });
