/**
 * Förhandsgranskning: osparade utkast lagras tillfälligt i webbläsarens
 * sessionStorage och läses av de publika sidorna bara när
 * förhandsgranskningsläget är aktivt i samma flik/session.
 * Inget skrivs till databasen eller demoläget förrän "Spara" trycks.
 */

const FLAGGA = "ekorrit-forhandsvisning";
const PREFIX = "forhandsvisning:";

const lagring = () => (typeof window === "undefined" ? null : window.sessionStorage);

/** Nyckel för ett utkast: tabellsektion per rad, eller JSON-sektion per sida. */
export function utkastNyckel(tabell: string, id: string): string {
  return `${PREFIX}${tabell}:${id}`;
}

/** Aktiveras när en sida öppnas med ?forhandsvisning=1. Returnerar true om läget är på. */
export function arForhandsvisningAktiv(): boolean {
  const l = lagring();
  if (!l) return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("forhandsvisning") === "1") {
      l.setItem(FLAGGA, "1");
      return true;
    }
    return l.getItem(FLAGGA) === "1";
  } catch {
    return false;
  }
}

export function stangForhandsvisning(): void {
  lagring()?.removeItem(FLAGGA);
}

/** Sparar/ersätter ett utkast för en tabellrad. */
export function sparaUtkast(tabell: string, id: string, rad: Record<string, unknown>): void {
  try {
    lagring()?.setItem(utkastNyckel(tabell, id), JSON.stringify(rad));
  } catch {
    /* lagring full – ignoreras */
  }
}

export function lasUtkast<T>(tabell: string, id: string): T | null {
  try {
    const rått = lagring()?.getItem(utkastNyckel(tabell, id));
    return rått ? (JSON.parse(rått) as T) : null;
  } catch {
    return null;
  }
}

export function tabortUtkast(tabell: string, id: string): void {
  lagring()?.removeItem(utkastNyckel(tabell, id));
}

/** Alla utkast för en tabell (för att kunna lägga till helt nya poster i listor). */
export function allaUtkast<T>(tabell: string): T[] {
  const l = lagring();
  if (!l) return [];
  const ut: T[] = [];
  try {
    for (let i = 0; i < l.length; i++) {
      const nyckel = l.key(i);
      if (nyckel?.startsWith(`${PREFIX}${tabell}:`)) {
        const rått = l.getItem(nyckel);
        if (rått) ut.push(JSON.parse(rått) as T);
      }
    }
  } catch {
    /* ignoreras */
  }
  return ut;
}

/**
 * Slår ihop en hämtad lista med utkasten: befintliga rader ersätts,
 * helt nya utkast läggs till sist. Körs bara i förhandsgranskningsläge.
 */
export function appliceraUtkast<T extends { id: string }>(tabell: string, lista: T[]): T[] {
  if (!arForhandsvisningAktiv()) return lista;
  const utkast = allaUtkast<T>(tabell);
  if (utkast.length === 0) return lista;
  const perId = new Map(utkast.map((u) => [u.id, u]));
  const sammanslagen = lista.map((rad) => perId.get(rad.id) ?? rad);
  const kanda = new Set(lista.map((r) => r.id));
  for (const u of utkast) if (!kanda.has(u.id)) sammanslagen.push(u);
  return sammanslagen;
}

/** JSON-sektioner (sidor/site): utkastet skriver över det sparade objektet. */
export function appliceraJsonUtkast<T extends object>(
  tabell: string,
  nyckel: string,
  data: T,
): T {
  if (!arForhandsvisningAktiv()) return data;
  const utkast = lasUtkast<Record<string, unknown>>(tabell, nyckel);
  return utkast ? ({ ...data, ...utkast } as T) : data;
}

/** Bygger den publika adressen som visar utkastet. */
export function byggForhandsvisningsUrl(sokvag: string): string {
  const skiljetecken = sokvag.includes("?") ? "&" : "?";
  return `${sokvag}${skiljetecken}forhandsvisning=1`;
}
