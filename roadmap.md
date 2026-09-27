# Ekorrit AB – roadmap

## Innehållsanpassning
- [x] Uppdatera kärnbudskap och metadata
- [x] Anpassa tjänster, om oss och gemensamma uppmaningar
- [x] Rätta kontorsbeskrivningar och geografisk räckvidd
- [x] Anpassa FAQ, nyheter och kundreferenser
- [x] Verifiera alla publika sidor och responsiva vyer

## Adminpanel + förberedd Supabase-koppling
- [x] Dubbelmode för publika sidor (Supabase om kopplat, annars demoläge)
- [x] Adminpanel: auth, sektioner, tabell- och JSON-redigering, bilduppladdning
- [x] Fixa formulärs-/layoutbuggar (tomRad, AdminShell, gömma sajmensy på /admin)
- [x] supabase/setup.sql (tabeller, RLS, grants, roller, bucket media, seed)
- [x] supabase/GUIDE.md + .env.example (steg-för-steg för användarens eget projekt)
- [x] Ersätt kodredigering för Sidtexter och Företagsuppgifter med lättanvända formulär
- [x] Verifiera formulärens sparning, mobilvy och admininloggning
- [x] Skapa publik medarbetarsida med porträtt, roller och presentationer
- [x] Lägg till enkel medarbetarredigering i adminpanelen och Supabase-scriptet
- [x] Förhandsgranskning före publicering: delad vy, enhetsväxling, utkast i sessionStorage
- [ ] Användaren skapar eget Supabase-projekt och klistrar in VITE_SUPABASE_URL /
      VITE_SUPABASE_PUBLISHABLE_KEY – blockerad: väntar på användarens nycklar
- [ ] /admin-bygg för riktiga konton (Supabase Auth + user_roles) – väntar på databas
