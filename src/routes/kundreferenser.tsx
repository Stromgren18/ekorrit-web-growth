import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/kundreferenser")({
  component: () => <Outlet />,
});
