# Ekorrit Web Growth

Bygg en komplett, modern och responsiv webbplats för redovisningsbyrån Ekorrit AB (baserad i Strömsund och Östersund) tillsammans med ett enkelt admin-gränssnitt för innehållshantering. Loveable Cloud får absolut INTE aktiveras. Jag ska koppla allt manuellt.


### 1. DESIGN & FÄRGPALETT

- **Aesthetic:** Varm, professionell, förtroendeingivande och stilren känsla.

- **Färger:** 

  - Primärfärg: Dov salviaggrön/olivgrön (#6B7A6E / #78867B).

  - Sekundärfärg/Bakgrund: Mjuk varmvit/ljus sandton (#F9F9F7 / #FFFFFF) samt mörk salviaggrön för kontrastsektioner.

  - Text: Mörkt koksgrå (#222522) istället för ren svart.

- **Form:** Mjuka former med rundade hörn på knappar (`rounded-full`) och kort (`rounded-2xl`).




---




### 2. MENY & NAVIGATION

- **Header:** Logotyp till vänster, ISO 9001-badge, navigeringslänkar samt en prominent CTA-knapp "Kontakta oss". Sociala ikonlänkar (Instagram, Facebook) längst upp i en toppmeny.

- **Menystruktur:**

  1. Hem

  2. Tjänster

  3. Om oss

  4. Kundreferenser (NY)

  5. Frågor & Svar (NY)

  6. Aktuellt (tidigare "Nyheter")

  7. Dokument

  8. Kontakt




---




### 3. PUBLIKA SIDOR & SEKTIONER




1. **Startsidan (`/`):**

   - **Hero:** Huvudrubrik: "Vi kan ekonomi – räkna med oss". Underrubrik som lyfter "Ekonomisk rådgivning & redovisning i Strömsund & Östersund". Två knappar: "Våra tjänster" (primär) och "Kontakta oss" (sekundär).

   - **Certifieringar/Förtroende:** Rad med logotyper för ISO 9001, Srf Konsulterna, REX och "Sveriges nöjdaste kunder".

   - **Tjänsteöversikt:** 4 huvudkort för Bokföring, Årsredovisning & Bokslut, Lönehantering samt Kvalificerad Rådgivning.

   - **Aktuellt-preview:** Visa de 3 senaste artiklarna från databasen med bild, datum och utdrag.

   - **Kundreferenser-preview:** En stilren karusell eller citatsektion med utvalda kunduttalanden.

   - **CTA-sektion:** Boka ett möte med kontoret i Strömsund eller Östersund.




2. **Tjänster (`/tjanster`):**

   - Översiktssida samt dynamiska undersidor/flikar för respektive tjänst (t.ex. `/tjanster/bokforing`, `/tjanster/arsredovisning-bokslut`, `/tjanster/lonehantering`, `/tjanster/radgivning`) för att maximera lokal SEO.




3. **Kundreferenser (`/kundreferenser`):**

   - Grid-layout som visar citat från nöjda kunder, företagsnamn, kontaktperson och eventuell logotyp/bild.




4. **Frågor & Svar (`/faq`):**

   - Använd Accordion-komponenter uppdelade i kategorier (t.ex. "Bli kund", "Bokföring & Löner", "Årsbokslut"). Sökfält längst upp för att filtrera frågor.




5. **Aktuellt (`/aktuellt`):**

   - Nyhetsflöde/blogg som hämtar inlägg dynamiskt från Supabase. Filter för kategorier ("Skattenyheter", "Kontorsnytt", "Lediga tjänster").

   - Enskild artikelsida (`/aktuellt/:slug`) med SEO-vänliga rubriker och delningslänkar.




6. **Kontakt (`/kontakt`):**

   - Kontaktuppgifter och adresser uppdelade på två kontors-kort: **Strömsund** (Lövbergavägen 8) och **Östersund**.

   - Kontaktformulär med valmöjlighet: "Gäller mitt ärende: Strömsund / Östersund / Allmänt".




7. **Footer:**

   - Adressuppgifter, snabblänkar, öppettider, länk till Integritetspolicy samt copyright.




---




### 4. SUPABASE-INTEGRATION & DATABASE SCHEMA

Skapa följande tabeller i Supabase:




1. `aktuellt`:

   - `id` (uuid, primary key)

   - `title` (text)

   - `slug` (text, unique)

   - `excerpt` (text)

   - `content` (text/markdown)

   - `image_url` (text)

   - `category` (text)

   - `published_at` (timestamp)

   - `created_at` (timestamp)




2. `kundreferenser`:

   - `id` (uuid, primary key)

   - `client_name` (text)

   - `company_name` (text)

   - `quote` (text)

   - `logo_url` (text)

   - `is_featured` (boolean)

   - `created_at` (timestamp)




3. `faq`:

   - `id` (uuid, primary key)

   - `question` (text)

   - `answer` (text)

   - `category` (text)

   - `sort_order` (integer)





---




### 5. SEO & TEKNISKA KRAV

- Nyckelord för lokal SEO vävs in i H1/H2-rubriker: *"Redovisningsbyrå Strömsund"*, *"Bokföring Östersund"*, *"Årsredovisning Jämtland"*, *"Auktoriserad redovisningskonsult"*.

- Inkludera Open Graph-taggar och unika meta-titlar/beskrivningar per sida.

- All bildhantering ska vara optimerad för snabb laddtid.

- 100 % mobilanpassad design.




---




### 6. ADMIN-PANEL (`/admin`)

I framtiden ska det finnas ett skyddat admin-gränssnitt med Supabase Auth (e-post/lösenord): Detta behöver du dock inte göra nu men tänkte bara skriva det så du förstår hur sidan kommer fungera. 

Loveable Cloud får absolut INTE aktiveras. Jag ska koppla allt manuellt.

Ställ gärna frågor så det inte blir några missförstånd.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e8198efc-f06c-4c8e-84c5-5eaea647ebe9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
