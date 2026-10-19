import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminNavigationProvider } from "@/components/admin/AdminNavigation";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: () => <AdminNavigationProvider><Outlet /></AdminNavigationProvider>,
});
