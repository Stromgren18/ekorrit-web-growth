-- ============================================================
-- Ekorrit AB – komplett SQL-uppsättning för ditt eget Supabase-projekt
--
-- Kör hela filen i SQL Editor (Dashboard → SQL Editor → New query).
-- Den skapar tabeller, RLS-regler, åtkomsträttigheter, Storage-bucket
-- `media`, admin-rollsystemet och exempeldatan som sajten visar idag.
-- ============================================================

-- ---------- 1. Tabeller ----------

create table if not exists public.aktuellt (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  image_url text,
  category text not null,
  published_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.kundreferenser (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company_name text not null,
  quote text not null,
  logo_url text,
  is_featured boolean not null default false,
  sort_order int,
  created_at timestamptz not null default now()
);

create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null,
  sort_order int
);

create table if not exists public.tjanster (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short text,
  heading text,
  intro text,
  bullets jsonb,
  sections jsonb,
  meta_title text,
  meta_description text,
  image_url text,
  sort_order int
);

create table if not exists public.dokument (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  href text,
  sort_order int
);

create table if not exists public.medarbetare (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  image_url text,
  email text,
  phone text,
  sort_order int,
  is_visible boolean not null default true
);

grant select, insert, update, delete on public.medarbetare to authenticated;
grant all on public.medarbetare to service_role;
grant select on public.medarbetare to anon;

-- Sidtexter (hero m.m.): en rad per sida
create table if not exists public.sidor (
  page text primary key,
  content jsonb not null default '{}'::jsonb
);

-- Företagsuppgifter (telefon, kontor, certifieringar, CTA)
create table if not exists public.site_installningar (
  key text primary key,
  value jsonb not null default '{}'::jsonb
);

-- ---------- 2. Rollsystem (admin) ----------

create type public.app_role as enum ('admin');

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Användare kan se sina egna roller"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- ---------- 3. Rättigheter (krävs för Data API) ----------

grant select, insert, update, delete on
  public.aktuellt, public.kundreferenser, public.faq, public.tjanster,
  public.dokument, public.medarbetare, public.sidor, public.site_installningar
to authenticated;
grant all on
  public.aktuellt, public.kundreferenser, public.faq, public.tjanster,
  public.dokument, public.medarbetare, public.sidor, public.site_installningar
to service_role;

-- Publik läsning av sajtinnehållet (anonyma besökare via publiceringsnyckeln)
grant select on
  public.aktuellt, public.kundreferenser, public.faq, public.tjanster,
  public.dokument, public.medarbetare, public.sidor, public.site_installningar
to anon;

-- ---------- 4. RLS-policyer ----------

alter table public.aktuellt enable row level security;
alter table public.kundreferenser enable row level security;
alter table public.faq enable row level security;
alter table public.tjanster enable row level security;
alter table public.dokument enable row level security;
alter table public.medarbetare enable row level security;
alter table public.sidor enable row level security;
alter table public.site_installningar enable row level security;

-- Alla kan läsa
create policy "Publik läsning" on public.aktuellt for select using (true);
create policy "Publik läsning" on public.kundreferenser for select using (true);
create policy "Publik läsning" on public.faq for select using (true);
create policy "Publik läsning" on public.tjanster for select using (true);
create policy "Publik läsning" on public.dokument for select using (true);
create policy "Publik läsning" on public.medarbetare for select using (true);
create policy "Publik läsning" on public.sidor for select using (true);
create policy "Publik läsning" on public.site_installningar for select using (true);

-- Admin styr allt
create policy "Admin styr allt" on public.aktuellt for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.kundreferenser for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.faq for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.tjanster for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.dokument for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.medarbetare for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.sidor for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin styr allt" on public.site_installningar for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ---------- 5. Storage-bucket för bilder ----------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Publik läsning av bilder" on storage.objects for select
  using (bucket_id = 'media');

create policy "Admin laddar upp bilder" on storage.objects for insert
  to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

create policy "Admin uppdaterar bilder" on storage.objects for update
  to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

create policy "Admin tar bort bilder" on storage.objects for delete
  to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

-- ---------- 6. Seed:exempeldata (ersätts av adminpanelen) ----------
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Nya regler för moms vid fakturering – så påverkas ditt företag', 'nya-regler-for-moms-vid-fakturering', 'Momsreglerna justeras löpande och det påverkar hur du fakturerar. Vi går igenom vad du behöver hålla koll på i din löpande bokföring.', 'Momsreglerna justeras löpande och det påverkar hur du fakturerar dina kunder.

För de flesta små och medelstora företag i Jämtland handlar det framför allt om tre saker: att fakturan innehåller alla obligatoriska uppgifter, att rätt momssats används och att redovisningsperioden stämmer med det som är registrerat hos Skatteverket.

Vi rekommenderar att du går igenom din fakturamall en gång per år. Saknas uppgifter kan avdragsrätten för din kund ifrågasättas, och då landar frågan ofta tillbaka hos dig.

Är du osäker på vad som gäller för just din verksamhet är du välkommen att kontakta oss i Strömsund eller Östersund. Vi går igenom underlagen tillsammans och ser till att den löpande bokföringen blir rätt från början.', '/images/aktuellt-dokument.jpg', 'Skattenyheter', '2026-08-21', '2026-08-21');
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Dags att planera inför bokslutet – vår checklista', 'dags-att-planera-infor-bokslutet', 'Ett bra bokslut börjar långt före räkenskapsårets slut. Här är de punkter vi går igenom med våra kunder inför årsredovisningen.', 'Ett bra bokslut börjar långt före räkenskapsårets slut.

Vi brukar sätta av ett möte några månader innan bokslutsdatum för att gå igenom lagervärdering, kundfordringar, periodiseringar och planerade investeringar. Då finns det fortfarande tid att fatta beslut som påverkar resultatet.

Den som väntar till efter räkenskapsårets slut har färre valmöjligheter kvar. Skatteplanering handlar sällan om avancerade upplägg, utan om att fatta rätt beslut i rätt tid.

Kontakta din redovisningskonsult hos oss för att boka ett planeringsmöte inför årsredovisningen.', '/images/aktuellt-dokument.jpg', 'Skattenyheter', '2026-07-04', '2026-07-04');
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Jämtländsk redovisningsbyrå för företag i hela Sverige', 'jamtlandsk-redovisningsbyra-for-hela-sverige', 'Med digitala underlag och möten kan ett personligt samarbete fungera lika bra oavsett var företaget finns.', 'Ekorrit har sitt huvudkontor i Strömsund och ett obemannat lokalkontor i Östersund. Den jämtländska förankringen är en viktig del av vilka vi är: personliga, trygga och okomplicerade.

Samtidigt behöver avstånd inte stå i vägen för en nära relation. Digitala underlag och möten via Teams gör att vi kan lära känna både företaget och människorna bakom det, även när kunden finns på en annan plats i Sverige.

Du får kontinuitet och kontakt med människor som känner verksamheten. Det gör det enklare att ställa frågor, följa ekonomin och använda siffrorna för att planera framåt.

För oss är personlig redovisning ett arbetssätt, inte en geografisk begränsning.', '/images/aktuellt-jamtland.jpg', 'Kontorsnytt', '2026-06-12', '2026-06-12');
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Vi söker en redovisningskonsult till Strömsund', 'vi-soker-redovisningskonsult-stromsund', 'Vill du arbeta nära kunden med hela bredden av redovisning? Vi utökar teamet på vårt kontor i Strömsund.', 'Vi söker dig som vill arbeta nära kunden med hela bredden av redovisning.

Hos oss får du eget kundansvar, kollegor som gärna delar kunskap och möjlighet att utvecklas mot auktorisation. Du arbetar med löpande bokföring, bokslut, deklarationer och rådgivning.

Vi tror att du har erfarenhet från byrå eller ekonomiavdelning, är strukturerad och tycker om kontakten med företagare.

Skicka din ansökan till oss – vi läser ansökningar löpande.', '/images/aktuellt-mote.jpg', 'Lediga tjänster', '2026-05-28', '2026-05-28');
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Digitala löner – så förenklar du lönehanteringen', 'digitala-loner-forenkla-lonehanteringen', 'Från tidrapport till lönespecifikation och arbetsgivardeklaration. Så ser ett digitalt löneflöde ut i praktiken.', 'Lönehantering är ett av de områden där digitala flöden gör allra störst skillnad.

Med digital tidrapportering, automatiska lönespecifikationer och rapportering av arbetsgivardeklaration på individnivå minskar både tidsåtgången och risken för fel. Dina medarbetare får sin lönespecifikation direkt i mobilen.

Vi tar hand om hela kedjan, eller de delar du vill lämna ifrån dig. Semesterberäkningar, reseräkningar, förmåner och rapportering till Skatteverket ingår i uppdraget.

Vill du veta hur ett digitalt löneflöde skulle se ut hos er? Boka ett möte med oss.', '/images/aktuellt-mote.jpg', 'Skattenyheter', '2026-04-15', '2026-04-15');
insert into public.aktuellt ("title", "slug", "excerpt", "content", "image_url", "category", "published_at", "created_at") values ('Tack för förtroendet – Sveriges nöjdaste kunder', 'tack-for-fortroendet', 'Våra kunder har svarat och vi är stolta över resultatet. Här berättar vi vad vi tar med oss framåt.', 'Våra kunder har svarat i den årliga kundundersökningen och vi är stolta över resultatet.

Det som lyfts fram tydligast är tillgängligheten: att det går att ringa och få svar av någon som känner företaget. Det är precis den kontinuitet och personliga kontakt vi vill erbjuda.

Vi tar också med oss förbättringsförslagen. Flera kunder vill ha ännu tydligare återkoppling under året, inte bara vid bokslutet, och det arbetar vi vidare med.

Stort tack till alla som tog sig tid att svara.', '/images/aktuellt-jamtland.jpg', 'Kontorsnytt', '2026-03-02', '2026-03-02');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Anna Lindgren', 'Lindgrens Bygg & Entreprenad AB', 'Vi lämnade över bokföringen och lönehanteringen och fick samtidigt ett bollplank som förstår hur ett byggföretag faktiskt fungerar.', null, true, '2026-05-02');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Mikael Sundin', 'Sundins Åkeri', 'Det bästa är tillgängligheten. Jag ringer, får svar direkt av någon som känner mitt bolag och kan gå vidare med dagen.', null, true, '2026-04-18');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Karin Ohlsson', 'Fjällkraft Installation AB', 'Vi pratar inte bara om året som gått. Inför bokslutet fick vi konkreta råd som hjälpte oss att planera framåt och gjorde verklig skillnad.', null, true, '2026-03-27');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Johan Persson', 'Strömsunds Trä & Interiör', 'Vi gick från pappershögar till ett digitalt flöde på några veckor. Nu ser jag hur bolaget går utan att behöva vänta på månadsskiftet.', null, false, '2026-02-14');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Elin Nyberg', 'Nybergs Vård & Omsorg AB', 'Lönerna kommer rätt varje månad och jag slipper hålla reda på regler kring semester och förmåner. Det ger mig tid till verksamheten.', null, false, '2026-01-30');
insert into public.kundreferenser ("client_name", "company_name", "quote", "logo_url", "is_featured", "created_at") values ('Peter Åberg', 'Åbergs Konsult & Handel', 'Som ensamföretagare vill jag ha en byrå som förklarar utan krångel. Jag får raka svar från människor som känner mitt företag och känner mig aldrig som en liten kund.', null, false, '2025-12-08');
insert into public.faq ("question", "answer", "category", "sort_order") values ('Hur blir jag kund hos er?', 'Du hör av dig via formuläret eller telefon, och vi bokar ett förutsättningslöst möte på huvudkontoret i Strömsund eller digitalt. Besök på vårt obemannade lokalkontor i Östersund sker efter överenskommelse. Vi går igenom verksamheten och lämnar sedan en tydlig uppdragsbeskrivning.', 'Bli kund', 1);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Vad kostar det att anlita en redovisningsbyrå?', 'Priset beror på omfattningen: antal verifikationer, antal anställda och hur digitalt ert underlag är. Vi lämnar alltid en uppskattning innan uppdraget startar så att du vet vad du kan räkna med. Många kunder väljer ett fast månadspris för den löpande redovisningen och löpande pris för rådgivning.', 'Bli kund', 2);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Kan jag byta byrå mitt under räkenskapsåret?', 'Ja, det går utmärkt. Vi hämtar in bokföringen från din tidigare byrå, stämmer av balanserna och tar över där den slutade. I praktiken sköter vi det mesta av kontakten så att du slipper administrationen.', 'Bli kund', 3);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Kan ni hjälpa företag i hela Sverige?', 'Ja. Ekorrit har sitt huvudkontor i Strömsund och ett obemannat lokalkontor i Östersund, men digitala underlag och möten gör att vi kan arbeta personligt med företag i hela Sverige.', 'Bli kund', 4);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Vilket bokföringsprogram använder ni?', 'Vi arbetar i de vanligaste molnbaserade systemen på marknaden och anpassar oss efter det du redan använder när det är möjligt. Har du inget system idag hjälper vi dig att välja ett som passar verksamhetens storlek.', 'Bokföring & Löner', 5);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Hur skickar jag in mina underlag?', 'Enklast är att leverantörsfakturor skickas digitalt direkt till systemet och att kvitton fotograferas i appen. Vi sätter upp flödet tillsammans vid uppstarten. Pappersunderlag går också bra, men det digitala sparar tid för alla.', 'Bokföring & Löner', 6);
insert into public.faq ("question", "answer", "category", "sort_order") values ('När senast behöver ni underlagen för momsredovisningen?', 'Vi kommer överens om ett datum i uppdragsbeskrivningen, oftast ett par veckor före deklarationsdagen. Då finns tid att stämma av och ställa frågor innan redovisningen lämnas in.', 'Bokföring & Löner', 7);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Kan ni sköta hela lönehanteringen?', 'Ja. Vi hanterar löneberäkning, lönespecifikationer, semesterberäkning, reseräkningar, förmåner, arbetsgivardeklaration på individnivå samt rapportering till Skatteverket och kollektivavtalsparter.', 'Bokföring & Löner', 8);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Vad händer om vi upptäcker ett fel i bokföringen?', 'Vi rättar felet enligt god redovisningssed och dokumenterar rättelsen. Om felet påverkar en redovisning som redan lämnats in hjälper vi dig att lämna en rättelse till Skatteverket.', 'Bokföring & Löner', 9);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Vad ingår i en årsredovisning?', 'En årsredovisning innehåller förvaltningsberättelse, resultaträkning, balansräkning och noter. Vi upprättar den enligt gällande regelverk, tar fram inkomstdeklaration för bolaget och går igenom resultatet med dig innan den lämnas in.', 'Årsbokslut', 10);
insert into public.faq ("question", "answer", "category", "sort_order") values ('När ska årsredovisningen vara inne?', 'För aktiebolag ska årsredovisningen lämnas till Bolagsverket senast sju månader efter räkenskapsårets slut. Vi håller koll på datumen i ditt uppdrag och påminner i god tid.', 'Årsbokslut', 11);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Behöver mitt företag en revisor?', 'Mindre aktiebolag är oftast undantagna från revisionsplikt. Om ditt bolag växer över gränsvärdena kan revision krävas, och då samarbetar vi med revisorn kring underlagen. Vi hjälper dig att bedöma vad som gäller.', 'Årsbokslut', 12);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Kan ni hjälpa till med skatteplanering inför bokslutet?', 'Ja, det är en av de vanligaste anledningarna till att kunder anlitar oss. Vi går igenom periodiseringsfonder, avskrivningar, löneuttag och utdelning i god tid före räkenskapsårets slut, då valmöjligheterna är som störst.', 'Årsbokslut', 13);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Vad betyder auktoriserad redovisningskonsult?', 'En auktoriserad redovisningskonsult är kvalitetssäkrad av branschorganisationen, arbetar enligt svensk standard för redovisningsuppdrag (Rex) och genomgår regelbunden kvalitetskontroll samt löpande utbildning.', 'Bli kund', 14);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Hur hanterar ni sekretess och personuppgifter?', 'Allt vi får tillgång till omfattas av sekretess. Personuppgifter behandlas enligt dataskyddsförordningen och lagras i system med behörighetsstyrning. Läs mer i vår integritetspolicy.', 'Bli kund', 15);
insert into public.faq ("question", "answer", "category", "sort_order") values ('Får jag en fast kontaktperson?', 'Ja. Personlig kontakt och kontinuitet är en viktig del av vårt arbetssätt. Du samarbetar med människor som lär känna företaget och kan följa ekonomin över tid, i stället för att börja om med en ny handläggare vid varje fråga.', 'Bli kund', 16);
insert into public.tjanster ("slug", "title", "short", "meta_title", "meta_description", "heading", "intro", "sections", "bullets") values ('bokforing', 'Bokföring', 'Löpande bokföring, moms och avstämningar med en personlig kontakt som ser helheten och hjälper dig framåt.', 'Personlig bokföring i Jämtland och hela Sverige | Ekorrit', 'Löpande bokföring, moms och rapporter med personlig kontakt. Ekorrit hjälper företag i Jämtland och hela Sverige med digitala flöden.', 'Personlig bokföring – nära dig även på distans', 'Vi sköter den löpande bokföringen så att du kan lägga tiden på verksamheten. Du får ordning på siffrorna och en redovisningskonsult som lär känna ditt företag, oavsett var i Sverige du finns.', '[{"heading":"Löpande redovisning varje månad","body":"Vi bokför leverantörsfakturor, kundfakturor, kvitton och banktransaktioner löpande och stämmer av balanskonton. Tydliga rapporter under året gör siffrorna användbara när du ska planera och fatta beslut."},{"heading":"Moms och skattedeklarationer","body":"Momsredovisning, arbetsgivardeklaration och periodisk sammanställning lämnas in i rätt tid. Vi håller koll på datum och regler så att du slipper förseningsavgifter."},{"heading":"Digitalt flöde från start","body":"Vi sätter upp ett digitalt underlagsflöde tillsammans med dig: fakturor direkt in i systemet och kvitton via app. Det ger snabbare rapporter och gör det enkelt att samarbeta personligt även på distans."}]'::jsonb, '["Löpande bokföring och avstämningar","Moms- och skattedeklarationer","Kund- och leverantörsreskontra","Månads- och periodrapporter","Fakturering och betalningsbevakning"]'::jsonb);
insert into public.tjanster ("slug", "title", "short", "meta_title", "meta_description", "heading", "intro", "sections", "bullets") values ('arsredovisning-bokslut', 'Årsredovisning & Bokslut', 'Bokslut, årsredovisning och deklaration – med en personlig genomgång som också hjälper dig att blicka framåt.', 'Årsredovisning Jämtland & bokslut | Ekorrit AB', 'Årsredovisning och bokslut med personlig genomgång. Ekorrit hjälper företag i Jämtland och hela Sverige att förstå resultatet och planera framåt.', 'Årsredovisning i Jämtland – bokslut du kan lita på', 'Vi upprättar bokslut och årsredovisning, tar fram inkomstdeklarationen och går igenom resultatet med dig. Tillsammans ser vi också vad siffrorna betyder för året som kommer.', '[{"heading":"Bokslut och årsredovisning","body":"Vi periodiserar, värderar lager och anläggningstillgångar, upprättar noter och förvaltningsberättelse samt lämnar in årsredovisningen till Bolagsverket i tid."},{"heading":"Inkomstdeklaration","body":"Bolagets deklaration och bilagor upprättas i samband med bokslutet. Vi hanterar även delägarnas K10-blanketter och beräkning av utdelningsutrymme."},{"heading":"Planering i god tid","body":"Ett bokslutsmöte några månader före räkenskapsårets slut ger utrymme att fatta beslut om löneuttag, avsättningar och investeringar medan de fortfarande påverkar resultatet."}]'::jsonb, '["Bokslut för aktiebolag, handelsbolag och enskild firma","Årsredovisning enligt K2 och K3","Inkomstdeklaration och bilagor","K10 och utdelningsberäkning","Genomgång av resultatet med din konsult"]'::jsonb);
insert into public.tjanster ("slug", "title", "short", "meta_title", "meta_description", "heading", "intro", "sections", "bullets") values ('lonehantering', 'Lönehantering', 'Trygg löneadministration med kontinuitet – rätt belopp, rätt rapportering och samma personliga kontakt varje månad.', 'Personlig lönehantering för företag | Ekorrit AB', 'Outsourca lönehanteringen till Ekorrit AB. Löneberäkning, lönespecifikationer, semester, förmåner och arbetsgivardeklaration på individnivå.', 'Lönehantering utan administrativt krångel', 'Löner ska bara fungera. Vi tar hand om hela löneprocessen – eller de delar du vill lämna ifrån dig – med en kontakt som känner företaget, medarbetarna och era rutiner.', '[{"heading":"Hela löneprocessen","body":"Från tidrapport till utbetalningsfil: löneberäkning, lönespecifikationer digitalt till medarbetarna, semesterberäkning, reseräkningar och förmåner."},{"heading":"Rapportering och avtal","body":"Arbetsgivardeklaration på individnivå, kontrolluppgifter, rapportering till kollektivavtalsparter och statistikuppgifter sköts inom uppdraget."},{"heading":"Stöd i arbetsgivarfrågor","body":"Vi svarar på frågor om sjuklön, föräldraledighet, semesterlagen och anställningsformer, och hjälper dig att göra rätt från början."}]'::jsonb, '["Löneberäkning och lönespecifikationer","Semester-, sjuk- och frånvarohantering","Reseräkningar och förmåner","Arbetsgivardeklaration på individnivå","Rapportering till avtalsparter"]'::jsonb);
insert into public.tjanster ("slug", "title", "short", "meta_title", "meta_description", "heading", "intro", "sections", "bullets") values ('radgivning', 'Kvalificerad Rådgivning', 'Budget, skatt, likviditet och tillväxt – ett ekonomiskt bollplank som känner ditt företag och ser framåt.', 'Auktoriserad redovisningskonsult – rådgivning | Ekorrit AB', 'Personlig ekonomisk rådgivning för företag i hela Sverige. Få stöd med budget, skatt, ägarfrågor, likviditet och tillväxt från Ekorrit.', 'Kvalificerad rådgivning av auktoriserad redovisningskonsult', 'Bra redovisning handlar inte bara om det som redan har hänt. Som ditt ekonomiska bollplank hjälper vi dig att använda siffrorna för att planera, fatta bättre beslut och skapa förutsättningar för lönsamhet.', '[{"heading":"Skatt och ägarfrågor","body":"Löneuttag kontra utdelning, fåmansföretagsreglerna, generationsskifte, köp och försäljning av bolag samt omstruktureringar – vi går igenom konsekvenserna innan du beslutar."},{"heading":"Budget, prognos och likviditet","body":"Vi bygger budget och likviditetsprognos utifrån din verksamhet och följer upp mot utfallet. Inför ett nytt verksamhetsår får du ett tydligt underlag för prioriteringar och beslut."},{"heading":"Bollplank i vardagen","body":"Ska du anställa, investera eller lägga ett anbud? Ring din konsult. Ofta räcker ett kort samtal för att undvika ett dyrt misstag."}]'::jsonb, '["Skatterådgivning för bolag och ägare","Budget, prognos och likviditetsplanering","Företagsöverlåtelser och generationsskifte","Underlag till bank och finansiärer","Löpande bollplank via telefon och möte"]'::jsonb);
insert into public.dokument ("title", "description", "category", "href") values ('Checklista inför bokslut', 'Punkterna vi går igenom tillsammans före räkenskapsårets slut.', 'Checklistor', '#');
insert into public.dokument ("title", "description", "category", "href") values ('Checklista ny kund', 'Underlag och behörigheter vi behöver vid uppstart av uppdraget.', 'Checklistor', '#');
insert into public.dokument ("title", "description", "category", "href") values ('Blankett – anställningsuppgifter', 'Fylls i vid nyanställning inför första löneutbetalningen.', 'Blanketter', '#');
insert into public.dokument ("title", "description", "category", "href") values ('Blankett – reseräkning', 'För redovisning av resor, traktamente och utlägg.', 'Blanketter', '#');
insert into public.dokument ("title", "description", "category", "href") values ('Integritetspolicy (PDF)', 'Så behandlar vi personuppgifter i våra uppdrag.', 'Villkor & policyer', '#');
insert into public.dokument ("title", "description", "category", "href") values ('Allmänna villkor för uppdrag', 'Villkoren som gäller för våra redovisningsuppdrag.', 'Villkor & policyer', '#');
insert into public.medarbetare ("name", "role", "bio", "image_url", "email", "phone", "sort_order", "is_visible") values ('Medarbetare 1', 'Auktoriserad redovisningskonsult', 'Skriv en kort och personlig presentation om erfarenhet, specialistområden och vad personen uppskattar mest i kundsamarbetet.', '/images/medarbetare-1.jpg', 'info@ekorrit.se', '+4667017570', 1, true);
insert into public.medarbetare ("name", "role", "bio", "image_url", "email", "phone", "sort_order", "is_visible") values ('Medarbetare 2', 'Redovisningskonsult', 'Ersätt exempeltexten med en lättläst presentation som hjälper kunderna att lära känna personen bakom siffrorna.', '/images/medarbetare-2.jpg', 'info@ekorrit.se', '+4667017570', 2, true);
insert into public.medarbetare ("name", "role", "bio", "image_url", "email", "phone", "sort_order", "is_visible") values ('Medarbetare 3', 'Lönekonsult', 'Berätta gärna om personens roll, kompetens och hur hon eller han hjälper företagets kunder i vardagen.', '/images/medarbetare-3.jpg', 'info@ekorrit.se', '+4667017570', 3, true);
insert into public.sidor ("page", "content") values ('hem', '{"hero":{"eyebrow":"Personlig redovisning med jämtländska rötter","title":"Vi kan ekonomi – räkna med oss","subtitle":"Hos oss vet du vem du pratar med. Fem auktoriserade redovisningskonsulter lär känna ditt företag och blir ett tryggt ekonomiskt bollplank – i Jämtland eller digitalt i hela Sverige.","image":"/images/hero-fjall.jpg","imageAlt":"Snötäckta jämtländska fjälltoppar i mjukt morgonljus"},"tjanster":{"eyebrow":"Våra tjänster","title":"Mer än en redovisningsbyrå","intro":"Bra redovisning visar inte bara vad som har hänt. Med löpande bokföring, bokslut, löneadministration, budget och rådgivning hjälper vi dig också att planera framåt och fatta bättre beslut."},"referenser":{"eyebrow":"Kundreferenser","title":"Vad våra kunder säger"},"aktuellt":{"eyebrow":"Aktuellt","title":"Senaste nytt från byrån"}}'::jsonb);
insert into public.sidor ("page", "content") values ('om-oss', '{"hero":{"eyebrow":"Om oss","title":"Personligt, tryggt och okomplicerat","intro":"Som privatägd och lokalt förankrad redovisningsbyrå erbjuder vi personlig kontakt, kontinuitet och ett långsiktigt samarbete."},"bild":{"url":"/images/aktuellt-mote.jpg","alt":"Rådgivningsmöte mellan redovisningskonsult och företagare"},"body":{"title":"Här vet du vem du pratar med","stycken":["Hos Ekorrit finns fem auktoriserade redovisningskonsulter. Du får möjlighet att bygga en relation med människor som lär känna ditt företag och din verksamhet, i stället för att möta en ny handläggare från gång till gång.","Huvudkontoret finns i Strömsund och i Östersund har vi ett obemannat lokalkontor. Digitala möten gör att vi kan vara den personliga jämtländska redovisningsbyrån även för företag i andra delar av Sverige – med ett norrländskt lugn i samarbetet."]},"nyckeltal":[{"label":"Auktoriserade konsulter","varde":"5"},{"label":"Kvalitetsledning","varde":"ISO 9001"}],"varderingar":[{"title":"Personlig kontinuitet","body":"Du vet vem du pratar med och bygger en långsiktig relation med människor som lär känna ditt företag och din vardag."},{"title":"Auktoriserad kompetens","body":"Fem auktoriserade redovisningskonsulter ger dig trygg, kvalitetssäkrad hjälp enligt ISO 9001 och Srf Konsulternas regelverk."},{"title":"Ett ekonomiskt bollplank","body":"Vi redovisar inte bara det som har hänt. Du får stöd att planera framåt, fatta bättre beslut och skapa lönsamhet."}]}'::jsonb);
insert into public.sidor ("page", "content") values ('tjanster', '{"hero":{"eyebrow":"Tjänster","title":"Redovisning som hjälper dig framåt","intro":"Välj de delar du vill lämna ifrån dig – eller låt oss ta hand om hela ekonomifunktionen. Du får en personlig kontakt som lär känna ditt företag och hjälper dig att använda siffrorna för bättre beslut."}}'::jsonb);
insert into public.sidor ("page", "content") values ('kundreferenser', '{"hero":{"eyebrow":"Kundreferenser","title":"Långsiktiga relationer med våra kunder","intro":"När vi lär känna företaget kan vi bidra med mer än bokföring. Här berättar några kunder om samarbetet med Ekorrit."}}'::jsonb);
insert into public.sidor ("page", "content") values ('medarbetare', '{"hero":{"eyebrow":"Möt teamet","title":"Människorna bakom Ekorrit","intro":"Hos oss får du en personlig kontakt som lär känna både dig och ditt företag. Här möter du teamet som hjälper våra kunder med redovisning, lön och rådgivning."}}'::jsonb);
insert into public.sidor ("page", "content") values ('faq', '{"hero":{"eyebrow":"Frågor & svar","title":"Vanliga frågor om redovisning och bokföring","intro":"Hittar du inte svaret här? Ring oss eller skicka ett meddelande – vi svarar gärna."}}'::jsonb);
insert into public.sidor ("page", "content") values ('aktuellt', '{"hero":{"eyebrow":"Aktuellt","title":"Kunskap för bättre ekonomiska beslut","intro":"Aktuellt om skatt, bokslut, budget, löner och sådant som hjälper dig att planera företagets ekonomi framåt."}}'::jsonb);
insert into public.sidor ("page", "content") values ('dokument', '{"hero":{"eyebrow":"Dokument","title":"Blanketter och checklistor","intro":"Här samlar vi de dokument våra kunder använder oftast. Saknar du något? Hör av dig, vi skickar det direkt."}}'::jsonb);
insert into public.sidor ("page", "content") values ('kontakt', '{"hero":{"eyebrow":"Kontakt","title":"Vi lär gärna känna ditt företag","intro":"Ring, mejla eller skicka ett meddelande. Vi träffas på huvudkontoret i Strömsund eller digitalt, och i Östersund efter överenskommelse."}}'::jsonb);
insert into public.site_installningar ("key", "value") values ('site', '{"name":"Ekorrit AB","tagline":"Vi kan ekonomi – räkna med oss","description":"Privatägd och auktoriserad redovisningsbyrå med rötterna i Strömsund. Personlig redovisning, lönehantering och ekonomisk rådgivning för företag i hela Sverige.","phone":"+4667017570","email":"info@ekorrit.se","orgNumber":"5566536321","social":{"instagram":"https://instagram.com/","facebook":"https://facebook.com/"},"offices":[{"id":"stromsund","city":"Strömsund","role":"Huvudkontor","street":"Lövbergavägen 8","postal":"833 35 Strömsund","phone":"+4667017570","email":"info@ekorrit.se"},{"id":"ostersund","city":"Östersund","role":"Obemannat lokalkontor – besök efter överenskommelse","street":"Armégränd 6","postal":"831 32 Östersund","phone":"+4667017570","email":"info@ekorrit.se"}],"certifications":[{"name":"ISO 9001","note":"Kvalitetscertifierad"},{"name":"Srf konsulterna","note":"Auktoriserad byrå"},{"name":"REX","note":"Svensk standard för redovisningsuppdrag"},{"name":"Sveriges nöjdaste kunder","note":"Utmärkelse"}]}'::jsonb);

