# Kundcase med egna undersidor

Ingen Lovable Cloud aktiveras. Allt byggs mot er egen Supabase via en SQL-fil som ni kör själva, och sajten fungerar i demoläge tills dess.

## Vad som byggs

1. **Ny case-struktur för kundreferenser**
   - Fält: företagsnamn, kontaktperson, bransch, ort, kort ingress, utmaning (behov), lösning (samarbete), resultat, citat, bild, logotyp, tjänster som används, utvald (ja/nej), sortering, slug (webbadress).
2. **Fiktiva startcase (3 st)** – tydligt märkta som exempel i adminpanelen, t.ex. ett åkeri i Strömsund, en restaurang i Östersund och ett byggföretag i Jämtland.
3. **Översiktssidan /kundreferenser** – kort per case med bild, bransch-etikett, ingress och "Läs hela caset". Filter per bransch.
4. **Egen undersida per case (/kundreferenser/[namn])**
   - Hero med bild, företag, bransch och ort.
   - Tre block: Utmaningen, Så hjälpte vi till, Resultatet.
   - Framhävt citat, faktaruta (bransch, ort, tjänster), länkar till relevanta tjänstesidor.
   - Fler case längst ner + kontaktknapp.
   - Egen sidtitel, beskrivning och delningsbild för Google och sociala medier.
5. **Startsidans referenssektion** länkar varje kort till respektive case.
6. **Adminpanelen** – nya fält i Kundreferenser med bilduppladdning, beskärning, förhandsgranskning och varning vid osparade ändringar (samma som idag).
7. **SQL-fil `supabase/kundcase.sql`** – lägger till de nya kolumnerna på befintlig tabell och fyller i de tre exempelcasen. Ni kör den i Supabase SQL Editor.

## Tekniska detaljer
- Utöka typen `Kundreferens` i `src/content/kundreferenser.ts` och demodatan; befintliga rader får genererad slug.
- Ny route `src/routes/kundreferenser.$slug.tsx` som läser från listfrågan (så förhandsgranskning fungerar), `notFound()` vid okänd slug.
- `src/lib/content/kundreferenser.ts` hanterar saknade kolumner (fallback till demodata) tills SQL-filen körts.
- Admin-fält läggs till i `src/lib/admin/sections.ts`.
- SQL: `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, unik slug, upsert av exempel.
