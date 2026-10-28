// Navegadores de Ignacio, reconocidos por su identificador de la lupa (tc-lupa-id). Sirve aunque en ese navegador nunca se haya
// abierto la guía con ?yo=1: sus visitas no cuentan como de Jesús ni mandan avisos.
// aea1575a: iPhone de Ignacio (Chrome). aaa072fb y ebf463da: ordenadores de Ignacio (Windows, Chrome).
const PROPIOS = ['aea1575a-5345-4e57-affe-4f95b96ff821', 'aaa072fb-7354-43b1-8f93-9af77466b843', 'ebf463da-ee81-44fa-9e67-50be9d8f199e'];

export function esYo(): boolean {
  try {
    if (localStorage.getItem('tc-guia-yo')) return true;
    if (PROPIOS.includes(localStorage.getItem('tc-lupa-id') || '')) {
      localStorage.setItem('tc-guia-yo', '1');
      return true;
    }
  } catch {}
  return false;
}
