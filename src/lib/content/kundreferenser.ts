import { queryOptions } from "@tanstack/react-query";
import { caseSlug, type Kundreferens } from "@/content/kundreferenser";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

/** Supabase-tabellen `kundreferenser` om kopplad, annars demoläget. */
export const kundreferenserQuery = () =>
  queryOptions({
    queryKey: ["kundreferenser"],
    placeholderData: demoStore.kundreferenser,
    queryFn: async () => {
      const rader = await hamtaTabell<Kundreferens>(
        "kundreferenser",
        demoStore.kundreferenser,
        "sort_order",
      );
      // Innan kundcase.sql körts saknas case-kolumnerna: fyll från demodatan.
      return rader.map((r) => {
        const demo = demoStore.kundreferenser.find((d) => d.company_name === r.company_name);
        return { ...demo, ...Object.fromEntries(Object.entries(r).filter(([, v]) => v != null)), slug: caseSlug({ ...demo, ...r } as Kundreferens) } as Kundreferens;
      });
    },
    select: (data) => appliceraUtkast("kundreferenser", data),
  });
