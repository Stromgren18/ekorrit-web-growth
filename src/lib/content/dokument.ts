import { queryOptions } from "@tanstack/react-query";
import type { Dokument } from "@/content/dokument";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

const sorterade = (lista: Dokument[]) =>
  lista
    .map((d, i) => ({ d, ordning: d.sort_order ?? i + 1 }))
    .sort((a, b) => a.ordning - b.ordning)
    .map((x) => x.d);

/** Supabase-tabellen `dokument` om kopplad, annars demoläget. */
export const dokumentQuery = () =>
  queryOptions({
    queryKey: ["dokument"],
    initialData: sorterade(demoStore.dokument),
    queryFn: async () =>
      sorterade(await hamtaTabell<Dokument>("dokument", demoStore.dokument, "sort_order")),
    select: (data) => appliceraUtkast("dokument", data),
  });
