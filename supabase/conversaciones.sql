-- Conversaciones del chat de la web de Tierno Centella.
-- Una fila por conversación; los mensajes van en JSON. Solo el servidor de la web escribe (clave de servicio).
create table if not exists public.conversaciones (
  id uuid primary key,
  creada timestamptz not null default now(),
  actualizada timestamptz not null default now(),
  idioma text not null default 'es',
  pagina_inicio text,
  ultima_pagina text,
  num_mensajes int not null default 0,
  primera_pregunta text,
  mensajes jsonb not null default '[]'::jsonb,
  pidio_llamada boolean not null default false,
  nombre text,
  telefono text,
  origen text
);
create index if not exists conversaciones_actualizada on public.conversaciones (actualizada desc);
alter table public.conversaciones enable row level security;
-- Sin políticas: nadie puede leer ni escribir desde el navegador; solo la clave de servicio del servidor.
