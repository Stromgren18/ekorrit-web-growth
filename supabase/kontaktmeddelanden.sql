-- Kör detta en gång i Supabase → SQL Editor.
-- Skapar tabellen där kontaktformulärets meddelanden sparas.
-- Besökare får bara SKICKA in, aldrig läsa. Endast admin ser inkorgen.

create table if not exists public.kontaktmeddelanden (
  id uuid primary key default gen_random_uuid(),
  namn text not null check (char_length(namn) between 1 and 100),
  foretag text check (char_length(foretag) <= 150),
  epost text not null check (char_length(epost) between 3 and 255),
  telefon text check (char_length(telefon) <= 40),
  tjanst text not null check (char_length(tjanst) <= 80),
  kontor text not null check (char_length(kontor) <= 80),
  meddelande text not null check (char_length(meddelande) between 1 and 3000),
  samtycke boolean not null check (samtycke = true),
  besvarad boolean not null default false,
  anteckning text,
  created_at timestamptz not null default now()
);

grant insert on public.kontaktmeddelanden to anon;
grant select, insert, update, delete on public.kontaktmeddelanden to authenticated;
grant all on public.kontaktmeddelanden to service_role;

alter table public.kontaktmeddelanden enable row level security;

drop policy if exists "Besökare skickar meddelanden" on public.kontaktmeddelanden;
create policy "Besökare skickar meddelanden" on public.kontaktmeddelanden
  for insert to anon, authenticated
  with check (samtycke = true and besvarad = false and anteckning is null);

drop policy if exists "Admin styr allt" on public.kontaktmeddelanden;
create policy "Admin styr allt" on public.kontaktmeddelanden for all
  to authenticated using (public.has_role(auth.uid(), 'admin'));
