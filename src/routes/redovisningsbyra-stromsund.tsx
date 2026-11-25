import { createFileRoute } from "@tanstack/react-router";
import { LocalOfficePage } from "@/components/site/LocalOfficePage";
import { localPageHead } from "@/content/local-pages";

export const Route = createFileRoute("/redovisningsbyra-stromsund")({
  head: () => localPageHead("stromsund"),
  component: StromsundPage,
});

function StromsundPage() {
  return <LocalOfficePage city="stromsund" />;
}