# Förhandsgranskning före publicering i adminpanelen

## Mål
Personalen ska kunna se exakt hur en sida, artikel eller post kommer att se ut för besökare – innan ändringen sparas och blir synlig på sajten.

## Hur det ska fungera (användarupplevelse)

**1. Knappen "Förhandsgranska" i varje redigeringsvy**
- I tabellvyerna (Aktuellt, Kundreferenser, Frågor & svar, Tjänster, Dokument, Medarbetare): en knapp "Förhandsgranska" bredvid "Spara" i redigeringsformuläret.
- I Sidtexter och Företagsuppgifter: samma knapp i den fasta spar-raden längst ned.

**2. Förhandsgranskningen öppnas i en panel till höger (delad vy)**
- Formuläret till vänster, den verkliga sidan till höger – man ser resultatet direkt medan man skriver.
- Panelen visar den riktiga publika sidan, renderad med de osparade ändringarna – inte en förenklad kopia. Det garanterar att det personalen ser är exakt det besökarna får.
- Överst i panelen en tydlig banderoll: "Förhandsgranskning – ändringarna är inte sparade ännu".

**3. Enhetsväxling dator/mobil**
- Två små knappar i panelens överkant: dator- och mobilikon. Personalen kan med ett klick se hur sidan ser ut på en mobiltelefon.

**4. "Öppna i ny flik"**
- En knapp som öppnar förhandsgranskningen i ett eget webbläsarfönster i full storlek – bra för att granska längre artiklar eller visa för en kollega.

**5. Tydlig åtskillnad mellan utkast och publicerat**
- Förhandsgranskningen påverkar aldrig den publika sajten. Besökare ser oförändrat innehåll tills "Spara" trycks.

## Teknisk lösning

- **Utkast lagras tillfälligt i webbläsaren** (sessionStorage) under en nyckel per sektion/post, t.ex. `forhandsvisning:aktuellt:<id>`. Inget skrivs till databasen eller demoläget förrän "Spara" trycks.
- **Publika sidor får ett förhandsgranskningsläge**: när en sida öppnas med parametern `?forhandsvisning=<nyckel>` läser innehållsfunktionerna (`src/lib/content/*`) utkastet från sessionStorage i stället för sparat innehåll. Läget är avstängt för vanliga besökare (fungerar bara i samma webbläsarsession där utkastet finns).
- **Delad vy i adminpanelen**: redigeringsformuläret och en inbäddad vy (iframe) av den publika sidan sida vid sida. Iframen pekar på den publika adressen med förhandsgranskningsparametern och laddas om när fält ändras (med kort fördröjning så den inte fladdrar vid varje tangenttryckning).
- **Enhetsväxling** styr bredden på den inbäddade vyn (t.ex. full bredd för dator, 390 px för mobil).
- **Banderollen** renderas av de publika sidorna när förhandsgranskningsläget är aktivt.

### Filer som berörs
- `src/lib/admin/preview.ts` (nytt): spara/läsa/ta bort utkast i sessionStorage, bygga förhandsgranskningsadresser.
- `src/lib/content/*` (aktuellt, kundreferenser, faq, tjanster, dokument, medarbetare, sidor, site): läs utkast när förhandsgranskningsparametern finns.
- `src/components/admin/Forhandsvisning.tsx` (nytt): panelen med enhetsväxling, banderoll och "Öppna i ny flik".
- `src/routes/admin.$section.tsx` och `src/components/admin/AdminJsonForms.tsx`: knappen "Förhandsgranska" och delad vy.
- Publika routes: minimal ändring – de använder redan innehållsfunktionerna; banderoll läggs i `__root.tsx`.

## Förslag som gör det ännu smidigare och proffsigare
1. **Automatisk uppdatering medan man skriver** – panelen uppdateras löpande, inget extra klick behövs.
2. **Markera det som ändrats** – fält som skiljer sig från det sparade får en diskret färgmarkering i formuläret, så man ser vad som är nytt.
3. **"Återställ utkast"** – en knapp som kastar de osparade ändringarna och visar det sparade läget igen.
4. **Delbar granskningslänk (senare, när databasen är kopplad)** – en länk som en kollega kan öppna för att granska innan publicering. Kräver att utkast lagras i databasen; lämpar sig som steg två efter Supabase-kopplingen.
5. **Publiceringsflöde med status (senare)** – Utkast/Publicerad per artikel, så man kan förbereda nyheter i förväg. Bygger naturligt vidare på denna funktion.

## Begränsningar
- Förhandsgranskningen är per webbläsare/session (utkastet ligger lokalt). Delning mellan kollegor blir möjlig först när databasen är kopplad.
- Fungerar i demoläget redan nu och fortsätter fungera oförändrat efter Supabase-kopplingen.
