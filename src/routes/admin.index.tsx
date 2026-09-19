import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { arAdmin } from "@/lib/admin/auth";
import { SEKTIONER } from "@/lib/admin/sections";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  beforeLoad: async () => {
    if (!(await arAdmin())) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminStart,
});

function AdminStart() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl">Innehållsadministration</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Välj en sektion i menyn för att redigera sajtens innehåll. Utan kopplad databas sparas
        ändringar i demoläget under pågående session; när Supabase kopplas in sparas allt direkt i
        dina tabeller.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {SEKTIONER.map((s) => (
          <li key={s.nyckel}>
            <Link
              to="/admin/$section"
              params={{ section: s.nyckel }}
              className="block h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-base font-semibold">{s.namn}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.beskrivning}</p>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
