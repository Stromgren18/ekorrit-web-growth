# Lättredigerad admin för Sidtexter och Företagsuppgifter

## Mål
Ersätt de två kodrutorna med vanliga, tydliga formulär på svenska. Personalen ska kunna ändra texter, bilder och kontaktuppgifter utan att känna till JSON eller kod.

## Sidtexter
- Behåll sidväljaren, men visa tydliga sidnamn: **Startsida**, **Om oss**, **Tjänster**, **Kundreferenser**, **Frågor & svar**, **Aktuellt**, **Dokument** och **Kontakt**.
- Dela varje sida i namngivna områden, exempelvis **Sidhuvud**, **Tjänster på startsidan**, **Kundreferenser** och **Aktuellt**.
- Visa vanliga textfält för korta texter och större skrivfält för ingresser och brödtext.
- Visa bilduppladdning med förhandsbild där sidan har en bild.
- Visa upprepade delar, som nyckeltal och värderingar på Om oss, som separata redigerbara block med **Lägg till** och **Ta bort**.
- En tydlig **Spara ändringar**-knapp gäller den valda sidan; osparade ändringar markeras innan användaren byter sida.

## Företagsuppgifter
- Dela formuläret i begripliga grupper: **Grunduppgifter**, **Sociala medier**, **Kontor**, **Certifieringar** och **Kontaktuppmaning**.
- Telefon, e-post, organisationsnummer och länkar får egna fält med exempel och enkel kontroll av format.
- Varje kontor visas som ett eget redigerbart block med ort, beskrivning, adress, telefon och e-post.
- Certifieringar visas som en enkel lista där poster kan läggas till, ändras och tas bort.
- Ingen teknisk nyckel, klammer eller kod visas för användaren.

## Förbättringar för ovana användare
- Använd vardagliga etiketter och kort hjälptext endast där den behövs.
- Visa sparstatus tydligt: **Osparade ändringar**, **Sparar…**, **Sparat** eller ett begripligt felmeddelande.
- Bekräfta borttagning av kontor, certifieringar och andra upprepade delar.
- Varna innan sidbyte när något inte har sparats.
- Behåll befintligt innehåll och samma lagringsformat, så databasscriptet och den framtida Supabase-kopplingen fortsätter fungera.
- Anpassa formulären för både dator och mobil, med stora klickytor och logisk ordning.

## Teknisk utformning
- Definiera formulärscheman för de befintliga nästlade sid- och företagsfälten och återanvänd adminpanelens befintliga fältkomponenter.
- Lägg till stöd för grupper, nästlade objekt, listor och bilduppgifter utan att ändra databasens JSON-struktur.
- Validera nödvändiga fält före sparning och bevara okända befintliga värden så att inget innehåll försvinner.
- Rätta samtidigt den bekräftade hydreringskonflikten på admininloggningen genom att göra första server- och klientrenderingen stabil.

## Kontroll
- Testa redigering och sparning för samtliga åtta sidval samt alla grupper under Företagsuppgifter i demoläge.
- Kontrollera att ändringarna syns direkt på de publika sidorna.
- Kontrollera mobil och dator samt att admininloggningen inte längre ger hydreringsfel.
