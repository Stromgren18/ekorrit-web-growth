-- Kundcase: kör en gång i Supabase SQL Editor.
alter table public.kundreferenser
  add column if not exists slug text,
  add column if not exists industry text,
  add column if not exists location text,
  add column if not exists excerpt text,
  add column if not exists challenge text,
  add column if not exists solution text,
  add column if not exists result text,
  add column if not exists image_url text,
  add column if not exists services text[];
create unique index if not exists kundreferenser_slug_key on public.kundreferenser (slug) where slug is not null;

update public.kundreferenser set slug = 'lindgrens-bygg', industry = 'Bygg & entreprenad', location = 'Strömsund', excerpt = 'Exempelcase: Ett växande byggföretag fick ordning på projektredovisning och löner – och ett bollplank inför varje anbud.', challenge = 'Bolaget hade vuxit från tre till tolv anställda på två år. Bokföringen sköttes på kvällstid, projektens lönsamhet var svår att följa och lönerna med ob-tillägg och traktamenten tog flera dagar varje månad.', solution = 'Vi tog över löpande bokföring och lönehantering, satte upp digitala flöden för leverantörsfakturor och kvitton och införde en enkel månadsrapport per projekt. En fast kontaktperson går igenom siffrorna med Anna varje kvartal.', result = 'Lönerna är klara på en dag, projektens marginaler syns varje månad och Anna lägger tiden på kunder och anbud i stället för pärmar.', services = array['Bokföring','Lönehantering','Rådgivning'] where company_name = 'Lindgrens Bygg & Entreprenad AB';
update public.kundreferenser set slug = 'sundins-akeri', industry = 'Transport & åkeri', location = 'Strömsund', excerpt = 'Exempelcase: Ett familjeåkeri fick snabba svar, koll på likviditeten och ett tryggt bokslut.', challenge = 'Höga bränslekostnader och stora fordonsinvesteringar gjorde likviditeten svårplanerad. Mikael saknade någon att snabbt stämma av med inför beslut.', solution = 'Vi sköter bokföring, moms och bokslut och tar fram en likviditetsprognos inför varje fordonsköp. Mikael ringer direkt till sin konsult när frågor dyker upp.', result = 'Investeringar planeras med underlag i stället för magkänsla, och bokslutet är klart i god tid varje år.', services = array['Bokföring','Årsredovisning & bokslut','Rådgivning'] where company_name = 'Sundins Åkeri';
update public.kundreferenser set slug = 'fjallkraft-installation', industry = 'Installation & service', location = 'Östersund', excerpt = 'Exempelcase: Ett installationsföretag använde bokslutet som startpunkt för en tydlig plan framåt.', challenge = 'Bolaget gick bra men ägarna saknade en bild av vilka tjänster som faktiskt bar lönsamheten, och skatteplaneringen gjordes i sista minuten.', solution = 'I samband med bokslutet gick vi igenom resultatet per affärsområde, föreslog en utdelnings- och lönestrategi och satte upp en enkel budget för nästa år.', result = 'Ägarna fick ett konkret beslutsunderlag, en bättre skattesituation och en budget de följer upp tillsammans med oss varje halvår.', services = array['Årsredovisning & bokslut','Rådgivning'] where company_name = 'Fjällkraft Installation AB';

update public.kundreferenser set slug = trim(both '-' from regexp_replace(lower(translate(company_name,'åäöÅÄÖ','aaoaao')),'[^a-z0-9]+','-','g')) where slug is null;
