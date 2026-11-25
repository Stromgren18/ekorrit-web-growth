import { createFileRoute } from "@tanstack/react-router";
import { LocalOfficePage } from "@/components/site/LocalOfficePage";
import { localPageHead } from "@/content/local-pages";

export const Route = createFileRoute("/redovisningsbyra-ostersund")({
  head: () => localPageHead("ostersund"),
  component: OstersundPage,
});

function OstersundPage() {
  return <LocalOfficePage city="ostersund" />;
}