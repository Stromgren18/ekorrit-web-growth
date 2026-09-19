# Koppla in din egen Supabase-databas

Sajten fungerar redan nu i **demoläge** (allt innehåll ligger i projektet).
När du kopplat in Supabase läses och sparas samma innehåll i din databas –
och adminpanelen på `/admin` blir fullt funktionell.

## Steg 1 – Skapa projektet (5 minuter)

1. Gå till [supabase.com](https://supabase.com) och logga in (eller skapa konto).
2. Klicka **New project**. Välj namn (t.ex. `ekorrit`), ett starkt
   databaslösenord (spara det!) och region **EU (Stockholm/Frankfurt)**.
3. Vänta någon minut medan projektet skapas.

## Steg 2 – Skapa tabellerna och exempeldatan

1. Öppna ditt projekt i Supabase-dashboarden.
2. Klicka **SQL Editor** i vänstermenyn → **New query**.
3. Kopiera *hela* innehållet i filen `supabase/setup.sql` i det här projektet
   och klistra in. Klicka **Run**.
4. Klart: tabellerna, säkerhetsreglerna, bild-bucketen `media` och
   exempeldatan (samma artiklar, citat, frågor och tjänster som sajten visar
   idag) finns nu i databasen.

## Steg 3 – Skapa ditt admin-konto

1. Gå till **Authentication → Users → Add user → Create new user**.
2. Fyll i din e-post och ett lösenord (kryssa i *Auto Confirm User*).
3. Kopiera användarens **UID** (visas i listan).
4. Gå till **SQL Editor** och kör:

```sql
insert into public.user_roles (user_id, role)
values ('KLISTRA-IN-UID-HÄR', 'admin');
```

Utan den raden kan kontot logga in men inte redigera något.

## Steg 4 – Hitta dina nycklar och koppla projektet

1. I Supabase: **Project Settings → API**.
2. Kopiera:
   - **Project URL** (t.ex. `https://abcd1234.supabase.co`)
   - **Publishable key** (börjar med `sb_publishable_…` eller är den långa
     `anon`-nyckeln)
3. I Lovable: öppna projektet och klistra in nycklarna som
   `VITE_SUPABASE_URL` och `VITE_SUPABASE_PUBLISHABLE_KEY` i projektets
   miljövariabler (se .env.example för format).

Så fort nycklarna finns på plats:

- Sajten läser artiklar, referenser, frågor, tjänster och sidtexter från
  databasen i stället för de lokala filerna.
- `/admin` visar ett riktigt inloggningsformulär – logga in med kontot du
  skapade i steg 3.

## Steg 5 – Testa adminpanelen

1. Gå till `/admin`. Du skickas till `/admin/login`.
2. Logga in med e-post och lösenord från steg 3.
3. Välj sektion i menyn (Aktuellt, Kundreferenser, Frågor & svar,
   Tjänster, Dokument, Sidtexter, Företagsuppgifter) och redigera.
4. Bildfält laddar upp filer till Storage-bucketen `media` och lagrar
   bildens publika webbadress.

## Om något går fel

- **Sidorna visar gammalt innehåll** → kontrollera att seed-datan kördes
  (steg 2) och att miljövariablerna är sparade och sidan laddats om.
- **"Kontot saknar admin-roll"** → kör SQL-raden i steg 3.4 med rätt UID.
- **Bilder laddas inte upp** → kontrollera att bucketen `media` finns
  (Storage i dashboarden) och att kontot har admin-rollen.
- **Något sparas inte** → öppna webbläsarens konsol och se om det finns ett
  felmeddelande från Supabase (oftast en saknad policy; kör setup.sql igen).
