import { createFileRoute } from "@tanstack/react-router";
import { AdminNavigationProvider } from "@/components/admin/AdminNavigation";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/layout-check")({
  ssr: false,
  component: () => (
    <AdminNavigationProvider>
      <AdminShell />
    </AdminNavigationProvider>
  ),
});
