import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import { arAdmin, hamtaSessionInfo, loggaIn, oppnaDemoLaget } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  beforeLoad: async () => {
    if (await arAdmin()) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminLogin,
});

function AdminLogin() {
  const [epost, setEpost] = useState("");
  const [losenord, setLosenord] = useState("");
  const [fel, setFel] = useState<string | null>(null);
  const [kontrollerar, setKontrollerar] = useState(false);

  async function hanteraInloggning(e: React.FormEvent) {
    e.preventDefault();
    setFel(null);
    setKontrollerar(true);
    const res = await loggaIn(epost, losenord);
    setKontrollerar(false);
    if (res.ok) {
      window.location.assign("/admin");
    } else {
      setFel(res.fel ?? "Inloggningen misslyckades.");
    }
  }

  async function hanteraDemo() {
    oppnaDemoLaget();
    const info = await hamtaSessionInfo();
    if (info.admin) window.location.assign("/admin");
    else setFel("Kunde inte öppna demoläget.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Logo />
        <h1 className="mt-6 font-display text-xl">Logga in</h1>

        {isSupabaseConfigured ? (
          <form className="mt-5 space-y-4" onSubmit={hanteraInloggning}>
            <div className="space-y-1.5">
              <Label htmlFor="epost">E-post</Label>
              <Input
                id="epost"
                type="email"
                autoComplete="email"
                required
                value={epost}
                onChange={(e) => setEpost(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="losenord">Lösenord</Label>
              <Input
                id="losenord"
                type="password"
                autoComplete="current-password"
                required
                value={losenord}
                onChange={(e) => setLosenord(e.target.value)}
                className="rounded-xl"
              />
            </div>
            {fel ? <p className="text-sm text-destructive">{fel}</p> : null}
            <Button type="submit" className="w-full rounded-full" disabled={kontrollerar}>
              {kontrollerar ? "Kontrollerar…" : "Logga in"}
            </Button>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Databasen är inte kopplad än. Öppna demoläget för att testa adminpanelen – ändringar
              sparas under sessionen och kopplas till databasen när den läggs till.
            </p>
            {fel ? <p className="text-sm text-destructive">{fel}</p> : null}
            <Button onClick={hanteraDemo} className="w-full rounded-full">
              Öppna demoläget
            </Button>
          </div>
        )}

        <a href="/" className="mt-6 block text-center text-sm text-muted-foreground hover:underline">
          Tillbaka till sajten
        </a>
      </div>
    </div>
  );
}
