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
  public.dokument, public.sidor, public.site_installningar
to authenticated;
grant all on
  public.aktuellt, public.kundreferenser, public.faq, public.tjanster,
  public.dokument, public.sidor, public.site_installningar
to service_role;

-- Publik läsning av sajtinnehållet (anonyma besökare via publiceringsnyckeln)
grant select on
  public.aktuellt, public.kundreferenser, public.faq, public.tjanster,
  public.dokument, public.sidor, public.site_installningar
to anon;

-- ---------- 4. RLS-policyer ----------

alter table public.aktuellt enable row level security;
alter table public.kundreferenser enable row level security;
alter table public.faq enable row level security;
alter table public.tjanster enable row level security;
alter table public.dokument enable row level security;
alter table public.sidor enable row level security;
alter table public.site_installningar enable row level security;

-- Alla kan läsa
create policy "Publik läsning" on public.aktuellt for select using (true);
create policy "Publik läsning" on public.kundreferenser for select using (true);
create policy "Publik läsning" on public.faq for select using (true);
create policy "Publik läsning" on public.tjanster for select using (true);
create policy "Publik läsning" on public.dokument for select using (true);
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
-- %SEED%
