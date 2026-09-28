import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { RotateCw, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const FORMAT = [
  { namn: "Porträtt 4:5", varde: 4 / 5 },
  { namn: "Kvadrat 1:1", varde: 1 },
  { namn: "Liggande 16:9", varde: 16 / 9 },
  { namn: "Original", varde: 0 },
] as const;

type Props = {
  fil: File | null;
  startFormat: number;
  onKlar: (fil: File) => void;
  onAvbryt: () => void;
};

export function BeskarningsDialog({ fil, startFormat, onKlar, onAvbryt }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [orgFormat, setOrgFormat] = useState(1);
  const [format, setFormat] = useState(startFormat);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [yta, setYta] = useState<Area | null>(null);
  const [arbetar, setArbetar] = useState(false);

  useEffect(() => {
    if (!fil) return;
    const u = URL.createObjectURL(fil);
    setUrl(u);
    setFormat(startFormat);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    const img = new Image();
    img.onload = () => setOrgFormat(img.naturalWidth / img.naturalHeight);
    img.src = u;
    return () => URL.revokeObjectURL(u);
  }, [fil, startFormat]);

  async function klar() {
    if (!fil || !url || !yta) return;
    setArbetar(true);
    try {
      onKlar(await beskar(url, yta, rotation, fil));
    } finally {
      setArbetar(false);
    }
  }

  return (
    <Dialog open={!!fil} onOpenChange={(o) => !o && onAvbryt()}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Justera bildens utsnitt</DialogTitle>
          <DialogDescription>
            Dra i bilden för att flytta den och använd reglaget för att zooma. Det som syns i rutan
            är det som visas på sidan.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {FORMAT.map((f) => (
            <Button
              key={f.namn}
              type="button"
              size="sm"
              variant={format === f.varde ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFormat(f.varde)}
            >
              {f.namn}
            </Button>
          ))}
        </div>
        <div className="relative h-80 overflow-hidden rounded-xl bg-muted sm:h-96">
          {url ? (
            <Cropper
              image={url}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={format || orgFormat}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, px) => setYta(px)}
              showGrid
            />
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <ZoomIn className="size-4 text-muted-foreground" aria-hidden />
          <Slider
            aria-label="Zoom"
            min={1}
            max={3}
            step={0.01}
            value={[zoom]}
            onValueChange={(v) => setZoom(v[0] ?? 1)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setRotation((r) => (r + 90) % 360)}
          >
            <RotateCw className="size-4" aria-hidden /> Rotera
          </Button>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={onAvbryt}>
            Avbryt
          </Button>
          <Button type="button" className="rounded-full" disabled={arbetar || !yta} onClick={() => void klar()}>
            {arbetar ? "Beskär…" : "Använd utsnittet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function beskar(url: string, yta: Area, rotation: number, fil: File): Promise<File> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  const rad = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  const bb = img.width * cos + img.height * sin;
  const bh = img.width * sin + img.height * cos;
  const hel = document.createElement("canvas");
  hel.width = bb;
  hel.height = bh;
  const hctx = hel.getContext("2d")!;
  hctx.translate(bb / 2, bh / 2);
  hctx.rotate(rad);
  hctx.drawImage(img, -img.width / 2, -img.height / 2);

  const ut = document.createElement("canvas");
  ut.width = Math.round(yta.width);
  ut.height = Math.round(yta.height);
  ut.getContext("2d")!.drawImage(hel, yta.x, yta.y, yta.width, yta.height, 0, 0, ut.width, ut.height);
  const typ = fil.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((r) => ut.toBlob(r, typ, 0.95));
  if (!blob) return fil;
  return new File([blob], fil.name, { type: typ });
}
