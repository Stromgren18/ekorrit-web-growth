import { useEffect, useState } from "react";
import { ExternalLink, Monitor, Smartphone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { byggForhandsvisningsUrl } from "@/lib/admin/preview";

/**
 * Delad vy i adminpanelen: visar den riktiga publika sidan med utkastet
 * i en inbäddad vy, med enhetsväxling och "öppna i ny flik".
 */
export function Forhandsvisning({
  sokvag,
  version,
  onStang,
}: {
  /** Publik sökväg, t.ex. "/aktuellt" eller "/tjanster/bokforing". */
  sokvag: string;
  /** Höjs när utkastet ändras – laddar om den inbäddade vyn. */
  version: number;
  onStang: () => void;
}) {
  const [enhet, setEnhet] = useState<"dator" | "mobil">("dator");
  const [ladde, setLadda] = useState(0);
  const url = byggForhandsvisningsUrl(sokvag);

  // Kort fördröjning så vyn inte fladdrar vid varje tangenttryckning.
  useEffect(() => {
    const t = window.setTimeout(() => setLadda(version), 600);
    return () => window.clearTimeout(t);
  }, [version]);

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/50 px-3 py-2">
        <p className="mr-auto text-xs font-medium text-muted-foreground">
          Förhandsgranskning – ändringarna är inte sparade ännu
        </p>
        <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
          <Button
            type="button"
            size="sm"
            variant={enhet === "dator" ? "default" : "ghost"}
            className="h-7 rounded-full px-2.5"
            onClick={() => setEnhet("dator")}
            aria-label="Visa som dator"
          >
            <Monitor className="size-4" aria-hidden />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={enhet === "mobil" ? "default" : "ghost"}
            className="h-7 rounded-full px-2.5"
            onClick={() => setEnhet("mobil")}
            aria-label="Visa som mobil"
          >
            <Smartphone className="size-4" aria-hidden />
          </Button>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 rounded-full px-3 text-xs"
          onClick={() => window.open(url, "_blank", "noopener")}
        >
          <ExternalLink className="size-3.5" aria-hidden /> Öppna i ny flik
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 rounded-full px-2"
          onClick={onStang}
          aria-label="Stäng förhandsgranskning"
        >
          <X className="size-4" aria-hidden />
        </Button>
      </div>
      <div className="flex flex-1 justify-center overflow-hidden bg-secondary/30 p-2">
        <iframe
          key={`${ladde}-${enhet}`}
          src={url}
          title="Förhandsgranskning av sidan"
          className={
            enhet === "mobil"
              ? "h-full w-[390px] rounded-xl border border-border bg-background shadow-md"
              : "h-full w-full rounded-xl border border-border bg-background shadow-md"
          }
        />
      </div>
    </div>
  );
}
