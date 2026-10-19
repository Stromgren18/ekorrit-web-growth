import type { ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { SEKTIONER } from "@/lib/admin/sections";
import { loggaUt } from "@/lib/admin/auth";
import { useAdminNavigation } from "./AdminNavigation";

export function AdminShell({ children }: { children?: ReactNode }) {
  const { overview, confirmLeave } = useAdminNavigation();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const categoryClick = (event: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname.replace(/\/$/, "") === `/admin/${key}`) {
      event.preventDefault();
      overview();
    }
  };
  const logout = () => {
    if (confirmLeave()) void loggaUt().then(() => window.location.assign("/admin/login"));
  };
  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card p-4 md:flex">
        <Logo className="scale-90 origin-left" />
        <p className="mt-1 px-3 text-xs text-muted-foreground">Adminpanel</p>
        <nav aria-label="Admin-sektioner" className="mt-6 flex flex-1 flex-col gap-1">
          {SEKTIONER.map((s) => (
            <Link
              key={s.nyckel}
              to="/admin/$section"
              params={{ section: s.nyckel }}
              onClick={(event) => categoryClick(event, s.nyckel)}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              {s.namn}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border pt-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
          >
            <ArrowLeft className="size-4" aria-hidden /> Till sajten
          </Link>
          <Button
            type="button"
            variant="ghost"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary"
          >
            <LogOut className="size-4" aria-hidden /> Logga ut
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
          <Logo className="scale-90 origin-left" />
          <Link to="/" className="ml-auto text-sm text-muted-foreground">
            Till sajten
          </Link>
          <Button variant="outline" size="sm" className="rounded-full" onClick={logout}>
            Logga ut
          </Button>
        </header>

        <nav aria-label="Admin-sektioner (mobil)" className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden">
          {SEKTIONER.map((s) => (
            <Link
              key={s.nyckel}
              to="/admin/$section"
              params={{ section: s.nyckel }}
              onClick={(event) => categoryClick(event, s.nyckel)}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
            >
              {s.namn}
            </Link>
          ))}
        </nav>

        <main className="min-w-0 flex-1 p-4 md:p-8">
          {children}
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
