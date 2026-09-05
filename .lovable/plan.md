# Ny hero: fjällmiljö med snötäckta toppar

Startsidans hero blir en helbredds fjällbild med snötäckta toppar i samma varma, salviagröna färgskala som resten av sajten. Nuvarande text ("Vi kan ekonomi – räkna med oss" med underrubrik och de två knapparna) behålls exakt och läggs tydligt framför bilden.

## Så kommer den se ut

- Bilden fyller hela hero-ytan, ca 80 % av skärmhöjden på dator och lägre på mobil.
- Motiv: dimmiga jämtländska fjäll med snötäckta toppar, mjukt morgonljus, dämpade gröna och sandfärgade toner — ingen skarpt blå himmel som bryter med färgskalan.
- Över bilden läggs en mjuk mörkgrön ton (från vänster/nedåt) så texten alltid har god kontrast, även på ljusa snöpartier.
- Texten vänsterjusterad i vitt/varmvitt, samma ordval som idag. Knapparna behåller rund form: den ena fylld, den andra ljus och genomskinlig med ram.
- Under hero läggs en mjuk övergång till den varmvita bakgrunden så skarven inte blir hård.
- Mobil: text centrerad eller vänsterställd med mer luft, bilden beskärs mot mitten så topparna syns.

## Tips för ett ännu snyggare och proffsigare intryck

Jag bygger in dessa direkt om du godkänner planen:

1. Lugn parallax-effekt: bilden rör sig långsamt vid scroll (avstängd för den som valt reducerad rörelse).
2. Diskret "scrolla ner"-indikator längst ner i hero.
3. Förtroenderaden (ISO 9001, Srf, REX, nöjdaste kunder) läggs som ett ljust band direkt under hero i stället för längre ner — starkare första intryck.
4. Texten tonas in mjukt vid sidladdning.

Valfritt, säg till om du vill ha det:
- Kort nyckeltalsrad i hero (t.ex. "5 auktoriserade konsulter", "Kunder i hela Sverige").
- Samma bildspråk återanvänds som smal bård på Om oss och Kontakt för en sammanhållen känsla.

## Tekniska detaljer

- Ny bild genereras i 1920×1080 till `public/images/hero-fjall.jpg`, prompt styrd mot befintlig palett (#6B7A6E, #F9F9F7, #222522). Behåller `hero-kontor.jpg` för användning i Aktuellt.
- Hero i `src/routes/index.tsx` byggs om till full-bleed sektion: `<img>` som absolut bakgrund (ingen lazy — LCP-bild, `fetchpriority="high"`, width/height satt) plus gradient-overlay via nya tokens i `src/styles.css` (`--hero-overlay-from/to`), aldrig hårdkodade färgklasser.
- Parallax som liten `useEffect`-baserad transform med `prefers-reduced-motion`-guard; ingen extra beroendeinstallation.
- Alt-text på svenska, oförändrad H1 (en per sida), oförändrad `head()`-metadata; ingen `og:image` läggs till eftersom bilden är en lokal, relativ resurs.
