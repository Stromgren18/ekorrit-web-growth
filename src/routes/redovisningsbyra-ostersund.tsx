import { createFileRoute } from "@tanstack/react-router";
import { LocalLandingPage } from "@/components/site/LocalLandingPage";
import { localHead, localPages } from "@/content/local-pages";

export const Route = createFileRoute("/redovisningsbyra-ostersund")({
  head: () => localHead(localPages.ostersund),
  component: OstersundPage,
});

function OstersundPage() {
  return <LocalLandingPage page={localPages.ostersund} />;
}