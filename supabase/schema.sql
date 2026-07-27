create extension if not exists pgcrypto;

create table if not exists athlete_profiles (
  id uuid primary key default gen_random_uuid(),
  athlete_key text unique not null,
  name text not null,
  height_cm integer,
  weight_kg numeric,
  injury_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists workout_sessions (
  id uuid primary key default gen_random_uuid(),
  athlete_key text not null,
  week_number integer not null,
  workout_date date not null,
  day_key text not null,
  day_label text not null,
  theme text,
  exercises jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists daily_checkins (
  id uuid primary key default gen_random_uuid(),
  athlete_key text not null,
  checkin_date date not null,
  weight_kg numeric,
  waist_cm numeric,
  sleep_hours numeric,
  sleep_quality integer,
  energy integer,
  back_pain integer,
  created_at timestamptz default now(),
  unique (athlete_key, checkin_date)
);

create table if not exists weekly_programs (
  id uuid primary key default gen_random_uuid(),
  athlete_key text not null,
  week_number integer not null,
  title text not null,
  rationale text,
  status text not null check (status in ('draft','approved','rejected')),
  program jsonb not null,
  created_at timestamptz default now(),
  approved_at timestamptz,
  unique (athlete_key, week_number, status)
);

create table if not exists coach_messages (
  id uuid primary key default gen_random_uuid(),
  athlete_key text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz default now()
);

alter table athlete_profiles enable row level security;
alter table workout_sessions enable row level security;
alter table daily_checkins enable row level security;
alter table weekly_programs enable row level security;
alter table coach_messages enable row level security;

-- Tek kullanıcı MVP'sinde erişim yalnızca sunucu tarafındaki service role anahtarıyla yapılmalıdır.
-- Frontend'e service role anahtarı koymayın. Kullanıcı hesabı eklendiğinde auth.uid() tabanlı RLS politikaları tanımlayın.
