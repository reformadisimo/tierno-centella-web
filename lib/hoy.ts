// Fecha de hoy en Madrid, en formato AAAA-MM-DD.
export function hoyMadrid(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
}

export function diaSiguiente(iso: string): string {
  const f = new Date(`${iso}T00:00:00Z`);
  f.setUTCDate(f.getUTCDate() + 1);
  return f.toISOString().slice(0, 10);
}
