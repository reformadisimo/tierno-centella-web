-- Aplicado en Supabase (proyecto compartido, pendiente de mover a uno propio del despacho).
create table if not exists public.tc_chat (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  conversacion text not null,
  rol text not null check (rol in ('user', 'assistant', 'llamada')),
  contenido text not null,
  pagina text,
  idioma text not null default 'es'
);
create index if not exists tc_chat_conversacion on public.tc_chat (conversacion, creado);
create index if not exists tc_chat_creado on public.tc_chat (creado desc);
alter table public.tc_chat enable row level security;
create policy tc_chat_solo_escribir on public.tc_chat for insert to anon, authenticated with check (true);
