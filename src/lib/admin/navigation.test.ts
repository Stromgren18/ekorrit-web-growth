import { describe, expect, test } from "bun:test";
import { bekraftaLamna, harAndringar } from "./navigation";

describe("osparade ändringar", () => {
  test("nekat sidbyte behåller redigeringen", () => {
    expect(bekraftaLamna(true, () => false)).toBe(false);
  });
  test("godkänt sidbyte tillåter att ändringarna kastas", () => {
    expect(bekraftaLamna(true, () => true)).toBe(true);
  });
  test("oförändrad post lämnas utan fråga", () => {
    expect(bekraftaLamna(false, () => { throw new Error("Ska inte fråga"); })).toBe(true);
  });
  test("ändrat artikelinnehåll upptäcks", () => {
    expect(harAndringar({ title: "Artikel" }, { title: "Ny rubrik" })).toBe(true);
  });
  test("återställd artikel är inte osparad", () => {
    expect(harAndringar({ title: "Artikel" }, { title: "Artikel" })).toBe(false);
  });
});