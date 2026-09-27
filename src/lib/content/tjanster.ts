import { queryOptions } from "@tanstack/react-query";
import type { Tjanst } from "@/content/tjanster";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

export const sorteraTjanster = (lista: Tjanst[]) =>
  lista
    .map((t, i) => ({ t, ordning: t.sort_order ?? i + 1 }))
    .sort((a, b) => a.ordning - b.ordning)
    .map((x) => x.t);

/** Supabase-tabellen `tjanster` om kopplad, annars demoläget. */
export const tjansterQuery = () =>
  queryOptions({
    queryKey: ["tjanster"],
    initialData: demoStore.tjanster,
    queryFn: async () =>
      sorteraTjanster(
        appliceraUtkast(
          "tjanster",
          await hamtaTabell<Tjanst>("tjanster", demoStore.tjanster, "sort_order"),
        ),
      ),
  });
