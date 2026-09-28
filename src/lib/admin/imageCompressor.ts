/**
 * Komprimerar bilder i webbläsaren innan uppladdning.
 * Max 1920×1920 px, WebP kvalitet 0.83. Små bilder släpps igenom orörda.
 */
export type KomprimeringsResultat = {
  fil: File;
  foreBytes: number;
  efterBytes: number;
  komprimerad: boolean;
};

const MAX_SIDA = 1920;
const KVALITET = 0.83;
const SMA_BYTES = 150 * 1024;
const SMA_PX = 1200;

function laddaBild(fil: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fil);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Kunde inte läsa bilden."));
    };
    img.src = url;
  });
}

function tillBlob(canvas: HTMLCanvasElement, typ: string, kvalitet: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, typ, kvalitet));
}

export async function komprimeraBild(fil: File): Promise<KomprimeringsResultat> {
  const orort = { fil, foreBytes: fil.size, efterBytes: fil.size, komprimerad: false };
  // SVG och GIF (animeringar) lämnas orörda
  if (!fil.type.startsWith("image/") || fil.type === "image/svg+xml" || fil.type === "image/gif") {
    return orort;
  }
  let img: HTMLImageElement;
  try {
    img = await laddaBild(fil);
  } catch {
    return orort;
  }
  const { naturalWidth: b, naturalHeight: h } = img;
  if (fil.size <= SMA_BYTES && Math.max(b, h) <= SMA_PX) return orort;

  const skala = Math.min(1, MAX_SIDA / Math.max(b, h));
  const nyB = Math.round(b * skala);
  const nyH = Math.round(h * skala);
  const canvas = document.createElement("canvas");
  canvas.width = nyB;
  canvas.height = nyH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return orort;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, nyB, nyH);

  let blob = await tillBlob(canvas, "image/webp", KVALITET);
  let typ = "image/webp";
  // Äldre Safari saknar WebP-export → JPEG (PNG om transparens kan behövas)
  if (!blob || blob.type !== "image/webp") {
    typ = fil.type === "image/png" ? "image/png" : "image/jpeg";
    blob = await tillBlob(canvas, typ, KVALITET);
  }
  if (!blob || blob.size >= fil.size) return orort;

  const ext = typ === "image/webp" ? "webp" : typ === "image/png" ? "png" : "jpg";
  const namn = fil.name.replace(/\.[^.]+$/, "") + "." + ext;
  return {
    fil: new File([blob], namn, { type: typ }),
    foreBytes: fil.size,
    efterBytes: blob.size,
    komprimerad: true,
  };
}

export function formateraStorlek(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} kB`;
}
