/* De dónde viene quien entra (sin cookies): se mira la dirección y la web de procedencia
   al llegar, y se guarda en el navegador (sessionStorage) para esta visita.
   Sirve para el contador propio y para saber qué trajo cada solicitud del test. */

export type Atribucion = { fuente: string; campana: string };

const CLAVE = "tc-atrib";

export function leerAtribucion(): Atribucion {
  try {
    const guardada = sessionStorage.getItem(CLAVE);
    if (guardada) return JSON.parse(guardada) as Atribucion;
  } catch {}
  const a = calcular();
  try { sessionStorage.setItem(CLAVE, JSON.stringify(a)); } catch {}
  return a;
}

function calcular(): Atribucion {
  let fuente = "directo";
  let campana = "";
  try {
    const q = new URLSearchParams(window.location.search);
    campana = (q.get("utm_campaign") ?? "").slice(0, 80);
    if (q.get("gclid") || q.get("gbraid") || q.get("wbraid")) fuente = "google-ads";
    else if (q.get("fbclid")) fuente = "meta";
    else if (q.get("utm_source")) fuente = (q.get("utm_source") ?? "").toLowerCase().slice(0, 60);
    else if (document.referrer) {
      const h = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (h && h !== window.location.hostname.replace(/^www\./, "")) fuente = h.slice(0, 60);
    }
  } catch {}
  return { fuente, campana };
}
