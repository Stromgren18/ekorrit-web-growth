# Medarbetarsida för Ekorrit AB

Jag bygger en ny publik sida som gör byrån mer personlig, och kopplar den till adminpanelen på samma sätt som övrigt innehåll: demoläge nu, Supabase när du själv kopplar databasen.

## Det som byggs

- Ny sida: `/medarbetare`.
- Navigationslänk i sidhuvud och sidfot.
- Sektion med medarbetarkort: porträtt, namn, roll, kort presentation, e-post/telefon om det finns.
- Personlig introduktion om teamet och byråns arbetssätt.
- Sidan anpassas för mobil, surfplatta och dator.
- Unik titel, beskrivning och delningstexter för sökmotorer.

## Adminpanelen

- Ny kategori i adminvyn: **Medarbetare**.
- Enkelt formulär för varje person:
  - Namn
  - Roll
  - Kort presentation
  - Porträttbild
  - E-post
  - Telefon
  - Sorteringsordning
  - Visa/dölj på sidan
- Bilder laddas upp via samma bildflöde som övriga adminbilder.
- I demoläge sparas ändringar under sessionen, precis som övrigt innehåll.

## För framtida Supabase-koppling

- `supabase/setup.sql` uppdateras med tabellen `medarbetare`, säkerhetsregler och exempelrader.
- Innehållet följer samma dubbelmode som resten av sajten: Supabase om nycklarna är kopplade, annars demo-data.
- Ingen Lovable Cloud aktiveras.

## Förslag för ännu bättre användning senare

- Lägg till fält för specialistområden, t.ex. bokslut, lön, rådgivning.
- Lägg till val för kontor: Strömsund, Östersund eller digitalt.
- Lägg till knapp ”Kontakta mig” på varje medarbetare.
- Lägg till ”aktiv/inaktiv” så tidigare medarbetare kan döljas utan att tas bort.
