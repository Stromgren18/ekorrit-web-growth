import { queryOptions } from "@tanstack/react-query";
import type { FaqPost } from "@/content/faq";
import { demoStore } from "@/lib/demoStore";
import { appliceraUtkast } from "@/lib/admin/preview";
import { hamtaTabell } from "./backend";

const sorterade = (lista: FaqPost[]) => [...lista].sort((a, b) => a.sort_order - b.sort_order);

/** Supabase-tabellen `faq` om kopplad, annars demoläget. */
export const faqQuery = () =>
  queryOptions({
    queryKey: ["faq"],
    placeholderData: sorterade(demoStore.faq),
    queryFn: async () =>
      sorterade(await hamtaTabell<FaqPost>("faq", demoStore.faq, "sort_order")),
    select: (data) => appliceraUtkast("faq", data),
  });
