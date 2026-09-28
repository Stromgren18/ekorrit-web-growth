import { useRef, useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upladdaBild } from "@/lib/admin/image";
import type { Falt, Rad } from "./EntityFormTypes";

export type { Falt, Rad };

type Props = {
  falt: Falt[];
  rad: Rad;
  onAndra: (nyckel: string, varde: unknown) => void;
};

export function FaltForm({ falt, rad, onAndra }: Props) {
  return (
    <div className="space-y-5">
      {falt.map((f) => (
        <FaltRad key={f.nyckel} falt={f} varde={rad[f.nyckel]} onAndra={onAndra} />
      ))}
    </div>
  );
}

function FaltRad({
  falt,
  varde,
  onAndra,
}: {
  falt: Falt;
  varde: unknown;
  onAndra: (nyckel: string, varde: unknown) => void;
}) {
  const filRef = useRef<HTMLInputElement>(null);
  const [laddar, setLaddar] = useState(false);
  const [fel, setFel] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  switch (falt.typ) {
    case "text":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Input
            id={falt.nyckel}
            value={String(varde ?? "")}
            required={falt.krav}
            onChange={(e) => onAndra(falt.nyckel, e.target.value)}
            className="rounded-xl"
          />
          {falt.hjalp ? <p className="text-xs text-muted-foreground">{falt.hjalp}</p> : null}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Textarea
            id={falt.nyckel}
            value={String(varde ?? "")}
            required={falt.krav}
            rows={falt.nyckel === "content" ? 10 : 4}
            onChange={(e) => onAndra(falt.nyckel, e.target.value)}
            className="rounded-xl"
          />
          {falt.hjalp ? <p className="text-xs text-muted-foreground">{falt.hjalp}</p> : null}
        </div>
      );

    case "date":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Input
            id={falt.nyckel}
            type="date"
            value={String(varde ?? "").slice(0, 10)}
            required={falt.krav}
            onChange={(e) => onAndra(falt.nyckel, e.target.value)}
            className="rounded-xl"
          />
        </div>
      );

    case "number":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Input
            id={falt.nyckel}
            type="number"
            value={varde === null || varde === undefined || varde === "" ? "" : Number(varde)}
            onChange={(e) =>
              onAndra(falt.nyckel, e.target.value === "" ? null : Number(e.target.value))
            }
            className="rounded-xl"
          />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between rounded-xl border border-border p-3">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Switch
            id={falt.nyckel}
            checked={Boolean(varde)}
            onCheckedChange={(v) => onAndra(falt.nyckel, v)}
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          <Label>{falt.label}</Label>
          <Select value={String(varde ?? "")} onValueChange={(v) => onAndra(falt.nyckel, v)}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Välj…" />
            </SelectTrigger>
            <SelectContent>
              {(falt.alternativ ?? []).map((alt) => (
                <SelectItem key={alt} value={alt}>
                  {alt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "image":
      return (
        <div className="space-y-1.5">
          <Label>{falt.label}</Label>
          <div className="flex items-center gap-3">
            {varde ? (
              <img
                src={String(varde)}
                alt={falt.label}
                className="size-16 rounded-xl object-cover"
              />
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                disabled={laddar}
                onClick={() => filRef.current?.click()}
              >
                <Upload className="size-4" aria-hidden /> {laddar ? "Laddar upp…" : "Ladda upp bild"}
              </Button>
              {varde ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => onAndra(falt.nyckel, null)}
                >
                  <X className="size-4" aria-hidden /> Ta bort
                </Button>
              ) : null}
            </div>
          </div>
          <input
            ref={filRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const fil = e.target.files?.[0];
              if (!fil) return;
              setLaddar(true);
              setFel(null);
              setInfo(null);
              const res = await upladdaBild(fil);
              setLaddar(false);
              if (res.url) onAndra(falt.nyckel, res.url);
              if (res.info) setInfo(res.info);
              if (res.fel) setFel(res.fel);
              e.target.value = "";
            }}
          />
          <Input
            value={String(varde ?? "")}
            placeholder="…eller klistra in en bild-URL"
            onChange={(e) => onAndra(falt.nyckel, e.target.value)}
            className="rounded-xl text-xs"
          />
          {info ? <p className="text-xs font-medium text-primary">✓ {info}</p> : null}
          {fel ? <p className="text-xs text-destructive">{fel}</p> : null}
          <p className="text-xs text-muted-foreground">
            Bilder krymps automatiskt till max 1920 px och sparas i ett lätt format.
          </p>
          <p className="text-xs text-muted-foreground">
            Utan kopplad databas sparas bilden bara under sessionen.
          </p>
        </div>
      );

    case "stringList":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={falt.nyckel}>{falt.label}</Label>
          <Textarea
            id={falt.nyckel}
            rows={5}
            value={Array.isArray(varde) ? (varde as string[]).join("\n") : String(varde ?? "")}
            onChange={(e) =>
              onAndra(
                falt.nyckel,
                e.target.value.split("\n").filter((r) => r.trim() !== ""),
              )
            }
            className="rounded-xl"
          />
          {falt.hjalp ? <p className="text-xs text-muted-foreground">{falt.hjalp}</p> : null}
        </div>
      );

    case "repeat": {
      const poster = Array.isArray(varde) ? (varde as Record<string, unknown>[]) : [];
      return (
        <div className="space-y-3">
          <Label>{falt.label}</Label>
          {poster.map((post, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Avsnitt {i + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-destructive"
                  onClick={() => {
                    const kopia = [...poster];
                    kopia.splice(i, 1);
                    onAndra(falt.nyckel, kopia);
                  }}
                >
                  <Trash2 className="size-4" aria-hidden /> Ta bort
                </Button>
              </div>
              {(falt.delFalt ?? []).map((df) => (
                <div key={df.nyckel} className="mt-2 space-y-1.5">
                  <Label>{df.label}</Label>
                  {df.typ === "textarea" ? (
                    <Textarea
                      value={String(post[df.nyckel] ?? "")}
                      rows={3}
                      onChange={(e) => {
                        const kopia = [...poster];
                        kopia[i] = { ...kopia[i], [df.nyckel]: e.target.value };
                        onAndra(falt.nyckel, kopia);
                      }}
                      className="rounded-xl"
                    />
                  ) : (
                    <Input
                      value={String(post[df.nyckel] ?? "")}
                      onChange={(e) => {
                        const kopia = [...poster];
                        kopia[i] = { ...kopia[i], [df.nyckel]: e.target.value };
                        onAndra(falt.nyckel, kopia);
                      }}
                      className="rounded-xl"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onAndra(falt.nyckel, [...poster, {}])}
          >
            <Plus className="size-4" aria-hidden /> Nytt avsnitt
          </Button>
        </div>
      );
    }
  }
}
