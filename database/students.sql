-- Run this script in Supabase Dashboard -> SQL Editor.
-- The names and email addresses below are fictional demo data.

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  course text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security.
alter table public.students enable row level security;

-- DEMO ONLY: allows visitors using the publishable key to read all demo rows.
-- Do not use this policy for real/private student information.
drop policy if exists "Demo users can read students" on public.students;
create policy "Demo users can read students"
on public.students
for select
to anon, authenticated
using (true);

insert into public.students (full_name, email, course)
values
  ('Daniel Bekele', 'daniel.demo@example.com', 'Computer Science'),
  ('Sara Ahmed', 'sara.demo@example.com', 'Information Systems'),
  ('Michael Tesfaye', 'michael.demo@example.com', 'Software Engineering')
on conflict (email) do nothing;

-- Check the sample records:
select id, full_name, email, course, created_at
from public.students
order by full_name;
