import { queryOptions } from "@tanstack/react-query";
import type { Kundreferens } from "@/content/kundreferenser";
import { demoStore } from "@/lib/demoStore";
import { hamtaTabell } from "./backend";

/** Supabase-tabellen `kundreferenser` om kopplad, annars demoläget. */
export const kundreferenserQuery = () =>
  queryOptions({
    queryKey: ["kundreferenser"],
    initialData: demoStore.kundreferenser,
    queryFn: async () =>
      hamtaTabell<Kundreferens>(
        "kundreferenser",
        demoStore.kundreferenser,
        "sort_order",
      ),
  });
