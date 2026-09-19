# Adminpanel i demoläge + komplett förberedelse för din egen Supabase

Lovable Cloud aktiveras inte. Adminpanelen byggs nu mot lokal demo-data; när du skapat ditt eget Supabase-projekt och klistrat in två nycklar växlar hela panelen (inklusive bilduppladdning till din egen Storage-bucket) till riktig databas — utan att någon kod behöver byggas om.

## Så fungerar demoläget

- Panelen på `/admin` är fullt klickbar: listor, formulär, redigering av text och rubriker.
- I demoläge sparas ändringar bara i minnet (försvinner vid omladdning) och en tydlig band högst upp visar "Demoläge — koppla Supabase för att spara".
- Bilduppladdning visas men är avstängd i demoläge (den kräver din Storage-bucket).
- När `VITE_SUPABASE_URL` och `VITE_SUPABASE_PUBLISHABLE_KEY` finns (din egen projektnyckel, inte Lovable Cloud) slår allt över automatiskt: inloggning, sparning och bilduppladdning.

## Vad panelen kan hantera

- **Aktuellt** — artiklar: skapa, redigera, radera; kategori, datum, text, bild.
- **Kundreferenser** — citat, företag, person, logotypbild.
- **Frågor & Svar** — frågor, svar, kategori, sortering.
- **Tjänster** — alla fyra undersidor: rubrik, ingress, textavsnitt, punkter, bild, SEO-text.
- **Om oss** — textblock och bilder.
- **Hem** — hero-rubrik/-bild, förtroenderad, tjänstekort.
- **Dokument** — listan på /dokument: titel, beskrivning, kategori, fil/länk.
- **Kontaktuppgifter** — kontor, adresser, telefon, e-post, org.nr, sociala länkar.

## Databas-script (färdigt att köra)

`supabase/setup.sql` skapas och innehåller i exakt körd ordning:

1. Tabeller: `aktuellt`, `kundreferenser`, `faq`, `tjanster`, `sidor` (hem/om-oss-block som JSON), `dokument`, `site_installningar` (nyckel→värde för kontaktuppgifter m.m.).
2. GRANT till `anon` (läs), `authenticated` (läs/skriv) och `service_role`.
3. RLS påslag: alla får läsa (publika sidorna), endast admin-roll får skriva.
4. `app_role`-uppräkning, `user_roles`-tabell och säkerhetsfunktion `has_role` — admin-status lagras aldrig i profilen.
5. Storage-bucket `media` (publik läsning, endast admin får ladda upp).
6. SEED: alla nuvarande exempeltexter, artiklar, citat, frågor och tjänstesidor infogas som riktiga rader, så webbplatsen ser identisk ut direkt efter koppling.

En steg-för-steg-guide (`supabase/GUIDE.md`) beskriver: skapa projekt på supabase.com, köra scriptet i SQL-editorn, skapa ditt admin-konto under Authentication → Users, lägga till raden i `user_roles`, och var de två nycklarna hittas (Project Settings → API).

## Tekniska detaljer

- `@supabase/supabase-js` installeras; egen klient i `src/integrations/supabase/client.ts` läser `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY` och exponerar `isSupabaseConfigured`.
- Datatyper i `src/content/` utökas så alla tabeller har typer; hämtningsskiktet i `src/lib/content/*` görs asynkront och dubbelmode: Supabase om konfigurerat, annars lokala filer. Offentliga sidor märker ingen skillnad.
- Admin-sidor under `src/routes/_authenticated/` med inloggningsgate (klientsidig kontroll, eftersom sessionen bor i webbläsaren): `/admin/login`, startsida med sektionsmeny, listvy + formulär per sektion.
- Skrivningar går via `createServerFn` med autentiserat läge; bilduppladdning via Storage-bucketen med offentlig URL tillbaka till `image_url`/`logo_url`.
- Panelen får samma salviagröna design som sajten; redigeringsformulär med förhandsvisning av bild, validering och bekräftelser.

## Ordning

1. Typer + dubbelmode-datalager.
2. SQL-script + guide.
3. Inloggning + gate.
4. Sektionsredigerare (aktuellt → citat → FAQ → tjänster → sidor → dokument → kontaktuppgifter).
5. Bilduppladdning.
6. Verifiering med Playwright i demoläge (alla vyer, mobil och desktop, inga konsolfel).

## Efter godkännande — vad du gör sen

1. Skapa gratisprojekt på supabase.com och kör `setup.sql` (guiden visar var).
2. Skapa ditt användarkonto och ge det admin-rollen.
3. Klistra in de två nycklarna i projektets miljövariabler hos Lovable (Connectors → Supabase, eller säg till mig så hjälper jag till).
