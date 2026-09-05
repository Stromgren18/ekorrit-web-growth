# Ekorrit AB — webbplats med innehållsstruktur för framtida Supabase

Ingen molntjänst aktiveras. Allt innehåll ligger i tydliga innehållsfiler i projektet, strukturerade exakt som de tabeller du ska skapa senare — så du kan koppla din egen Supabase manuellt utan att bygga om sidorna.

## Design

- Varm, stilren och förtroendeingivande känsla.
- Salviagrön primärfärg (#6B7A6E / #78867B), varmvit/sandton bakgrund (#F9F9F7), mörkt koksgrå text (#222522), mörkgröna kontrastsektioner.
- Runda knappar, mjuka kort, generöst luft, diskreta rörelser vid hovring och inscrollning.
- Alla färger läggs som centrala designtokens så en framtida justering slår igenom överallt.

## Sidor

1. **Hem** — hero "Vi kan ekonomi – räkna med oss" med underrubrik om Strömsund & Östersund och två knappar, förtroenderad (ISO 9001, Srf Konsulterna, REX, Sveriges nöjdaste kunder), fyra tjänstekort, tre senaste artiklarna, kundcitat i karusell, avslutande bokningssektion.
2. **Tjänster** — översikt plus fyra undersidor: bokföring, årsredovisning & bokslut, lönehantering, rådgivning. Varje med egen rubrikstruktur och lokala sökord.
3. **Kundreferenser** — rutnät med citat, företag, kontaktperson och logotypsplats.
4. **Frågor & Svar** — sökfält högst upp, hopfällbara frågor grupperade i kategorier (Bli kund, Bokföring & Löner, Årsbokslut).
5. **Aktuellt** — flöde med kategorifilter (Skattenyheter, Kontorsnytt, Lediga tjänster) och egen artikelsida per artikel med delningslänkar.
6. **Om oss** — byrån, arbetssätt, kontoren, auktorisation.
7. **Dokument** — nedladdningslistor (blanketter, checklistor) med platshållarfiler.
8. **Kontakt** — två kontorskort (Strömsund, Lövbergavägen 8, och Östersund), formulär med val Strömsund / Östersund / Allmänt. Skickat formulär visar tackmeddelande på skärmen.
9. **Integritetspolicy** — enkel textsida, länkad från foten.

Header med logotyp, ISO 9001-märke, meny och knappen "Kontakta oss"; toppmeny med Instagram- och Facebook-ikoner. Fot med adresser, snabblänkar, öppettider, policylänk och copyright. Mobilmeny som fälls ut.

## Innehåll

- Jag skriver realistiska svenska exempeltexter: 6 artiklar, 6 kundcitat, ca 15 frågor & svar, tjänstetexter, om-oss-text.
- Telefon, e-post, Östersundsadress och öppettider blir tydliga platshållare som du fyller i — jag hittar inte på riktiga uppgifter.
- Bilder: några genererade, stämningsfulla bilder i rätt färgskala plus enkla platshållare för kundlogotyper.

## Sökmotoroptimering

- Unik titel, beskrivning och delningstaggar per sida.
- Lokala sökord vävs in naturligt: Redovisningsbyrå Strömsund, Bokföring Östersund, Årsredovisning Jämtland, Auktoriserad redovisningskonsult.
- En H1 per sida, semantisk struktur, alt-texter, strukturerad data för byrån och för artiklar, komprimerade bilder med lazy loading.

## Tekniska detaljer

- TanStack Start-routes: `/`, `/tjanster`, `/tjanster/$slug`, `/om-oss`, `/kundreferenser`, `/faq`, `/aktuellt`, `/aktuellt/$slug`, `/dokument`, `/kontakt`, `/integritetspolicy`.
- Innehållsmoduler i `src/content/` (`aktuellt.ts`, `kundreferenser.ts`, `faq.ts`) med typer som speglar dina kolumner (t.ex. `title`, `slug`, `excerpt`, `content`, `image_url`, `category`, `published_at`).
- Datatillgång sker genom tunna hämtningsfunktioner (`getAktuellt`, `getKundreferenser`, `getFaq`) i `src/lib/content/*` — enda stället som behöver bytas när du kopplar Supabase.
- Designtokens i `src/styles.css`; shadcn-komponenter (Accordion, Card, Carousel, Form, Input, Select, Button, Sheet) med egna varianter.
- `head()` per route för titel/beskrivning/OG samt kanonisk länk; JSON-LD för LocalBusiness på kontakt/hem och Article på artikelsidor.
- Ingen inloggning byggs nu; `/admin` lämnas till senare steg.
