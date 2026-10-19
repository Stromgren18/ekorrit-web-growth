import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { bekraftaLamna, harAndringar } from "./navigation";

describe("osparade ändringar", () => {
  test("nekat sidbyte behåller redigeringen", () => {
    assert.equal(bekraftaLamna(true, () => false), false);
  });
  test("godkänt sidbyte tillåter att ändringarna kastas", () => {
    assert.equal(bekraftaLamna(true, () => true), true);
  });
  test("oförändrad post lämnas utan fråga", () => {
    assert.equal(bekraftaLamna(false, () => { throw new Error("Ska inte fråga"); }), true);
  });
  test("ändrat artikelinnehåll upptäcks", () => {
    assert.equal(harAndringar({ title: "Artikel" }, { title: "Ny rubrik" }), true);
  });
  test("återställd artikel är inte osparad", () => {
    assert.equal(harAndringar({ title: "Artikel" }, { title: "Artikel" }), false);
  });
});