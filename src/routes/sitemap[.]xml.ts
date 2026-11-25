import { createFileRoute } from "@tanstack/react-router";
import { tjanster } from "@/content/tjanster";
import { kundreferenser, caseSlug } from "@/content/kundreferenser";
import { aktuellt } from "@/content/aktuellt";

const BASE = "https://ekorrit.frilansnorr.se";

const statiska = [
  "/", "/tjanster", "/om-oss", "/medarbetare", "/kundreferenser",
  "/faq", "/aktuellt", "/dokument", "/kontakt", "/integritetspolicy",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...statiska,
          ...tjanster.map((t) => `/tjanster/${t.slug}`),
          ...kundreferenser.map((k) => `/kundreferenser/${caseSlug(k)}`),
          ...aktuellt.map((a) => `/aktuellt/${a.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)]
          .map((p) => `  <url><loc>${BASE}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
