import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "@/components/site/LocalLandingPage";
import { localHead, localPages } from "@/content/local-pages";

export const Route = createFileRoute("/redovisningsbyra-stromsund")({
  head: () => localHead(localPages.stromsund),
  component: StromsundPage,
});

function StromsundPage() {
  return <LocalLandingPage page={localPages.stromsund} />;
}