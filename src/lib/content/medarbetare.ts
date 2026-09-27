import { queryOptions } from "@tanstack/react-query";
import type { Medarbetare } from "@/content/medarbetare";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

/** Supabase-tabellen `medarbetare` om kopplad, annars demoläget. */
export const medarbetareQuery = () =>
  queryOptions({
    queryKey: ["medarbetare"],
    initialData: demoStore.medarbetare,
    queryFn: async () =>
      appliceraUtkast(
        "medarbetare",
        await hamtaTabell<Medarbetare>("medarbetare", demoStore.medarbetare, "sort_order"),
      ),
  });