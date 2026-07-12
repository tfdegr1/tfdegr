-- TFDEGR — Supabase schema. Paste into Supabase → SQL Editor → Run.
-- Mirrors the TS interfaces in src/lib/data/*. Scalars are typed columns
-- (snake_case); bilingual text / nested objects / arrays are JSONB stored
-- verbatim. Re-runnable (create if not exists + policy resets).

-- ── weapons ─────────────────────────────────────────────────────────
create table if not exists weapons (
  slug text primary key,
  name text,
  category text,
  side text,
  price int,
  damage int,
  fire_rate int,
  accuracy int,
  mobility int,
  magazine int,
  penetration text,
  kill_award int,
  introduced text,
  description jsonb,
  media jsonb
);

-- ── maps ────────────────────────────────────────────────────────────
create table if not exists maps (
  slug text primary key,
  name text,
  type text,
  bombsites jsonb,
  release_year int,
  active_duty boolean,
  callouts jsonb,
  description jsonb,
  media jsonb,
  overview_video jsonb
);

-- ── history_events ──────────────────────────────────────────────────
create table if not exists history_events (
  id text primary key,
  year int,
  "date" text,
  era text,
  title jsonb,
  description jsonb,
  media jsonb
);

-- ── tournaments ─────────────────────────────────────────────────────
create table if not exists tournaments (
  slug text primary key,
  name text,
  year int,
  tier text,
  is_major boolean,
  location jsonb,
  prize_pool int,
  winner text,
  runner_up text,
  description jsonb,
  media jsonb,
  highlight_video jsonb
);

-- ── players ─────────────────────────────────────────────────────────
create table if not exists players (
  slug text primary key,
  nickname text,
  real_name text,
  country text,
  team text,
  role text,
  rating real,
  majors_won int,
  active boolean,
  bio jsonb,
  media jsonb
);

-- ── kz_maps ─────────────────────────────────────────────────────────
create table if not exists kz_maps (
  slug text primary key,
  name text,
  tier int,
  style text,
  description jsonb,
  media jsonb,
  record_video jsonb
);

-- ── game_modes ──────────────────────────────────────────────────────
create table if not exists game_modes (
  slug text primary key,
  name jsonb,
  category text,
  players text,
  description jsonb,
  how_to_play jsonb,
  media jsonb
);

-- ── Row Level Security: public read-only (anon key is public) ────────
do $$
declare t text;
begin
  foreach t in array array[
    'weapons','maps','history_events','tournaments','players','kz_maps','game_modes'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists %I on %I;', 'public_read_' || t, t);
    execute format('create policy %I on %I for select using (true);', 'public_read_' || t, t);
  end loop;
end $$;
