import { queryOptions } from "@tanstack/react-query";
import type { Kundreferens } from "@/content/kundreferenser";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

/** Supabase-tabellen `kundreferenser` om kopplad, annars demoläget. */
export const kundreferenserQuery = () =>
  queryOptions({
    queryKey: ["kundreferenser"],
    initialData: demoStore.kundreferenser,
    queryFn: async () =>
      appliceraUtkast(
        "kundreferenser",
        await hamtaTabell<Kundreferens>(
          "kundreferenser",
          demoStore.kundreferenser,
          "sort_order",
        ),
      ),
  });
