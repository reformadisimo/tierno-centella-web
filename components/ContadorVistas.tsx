"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { leerAtribucion } from "@/lib/atribucion";

/* Contador propio de Tierno Centella, sin cookies (el mismo que Reformadísimo, cl·v970-974 y 31-oct).
   Cuenta a todos, acepten o no las cookies: página, de dónde viene, móvil u ordenador,
   si es la primera página de la visita (entrada) y si es la primera vez hoy de este navegador
   (nuevo = una persona distinta del día). Además, el TIEMPO con la página a la vista y el REBOTE
   (visita de una sola página y menos de 10 s), mandados a /api/tiempo al ocultar la pestaña, cambiar
   de página o salir. No viaja nada que identifique a nadie. Los robots no cuentan. */

const INTERNAS = /^\/(mesa-tc-6v9k3p|guia-jesus|crm|conversaciones)/; // páginas internas: la mesa, la guía de Jesús, el CRM y las conversaciones

function origen() {
  const { fuente } = leerAtribucion();
  const disp = window.matchMedia("(pointer: coarse)").matches ? "movil" : "pc";
  return { fuente, disp };
}

export default function ContadorVistas() {
  const ruta = usePathname();
  useEffect(() => {
    if (!ruta || navigator.webdriver || INTERNAS.test(ruta)) return;
    const t = setTimeout(() => {
      try {
        const { fuente, disp } = origen();
        let entrada = false;
        try { if (!sessionStorage.getItem("tc-visita")) { sessionStorage.setItem("tc-visita", "1"); entrada = true; } } catch {}
        let nuevo = false;
        try {
          const hoy = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" });
          if (localStorage.getItem("tc-dia") !== hoy) { localStorage.setItem("tc-dia", hoy); nuevo = true; }
        } catch {}
        try { sessionStorage.setItem("tc-pags", String(Number(sessionStorage.getItem("tc-pags") || 0) + 1)); } catch {}
        navigator.sendBeacon?.("/api/vista", JSON.stringify({ pagina: ruta, fuente, disp, entrada, nuevo }));
      } catch {}
    }, 1200);

    // Tiempo con la página a la vista: se acumula mientras la pestaña está visible y se manda en trozos.
    let desde = document.visibilityState === "visible" ? Date.now() : 0;
    let acumulado = 0;
    let total = 0;
    const esRebote = () => {
      try {
        if (sessionStorage.getItem("tc-rebote")) return false;
        if (Number(sessionStorage.getItem("tc-pags") || 0) !== 1 || total >= 10) return false;
        sessionStorage.setItem("tc-rebote", "1");
        return true;
      } catch { return false; }
    };
    const parar = () => { if (desde) { acumulado += Date.now() - desde; desde = 0; } };
    const mandar = (saliendo: boolean) => {
      parar();
      const s = Math.round(acumulado / 1000);
      acumulado = 0;
      total += s;
      const rebote = saliendo && esRebote();
      if (s < 1 && !rebote) return;
      try { const { fuente, disp } = origen(); navigator.sendBeacon?.("/api/tiempo", JSON.stringify({ pagina: ruta, fuente, disp, s, rebote })); } catch {}
    };
    const alCambiar = () => { if (document.visibilityState === "visible") { if (!desde) desde = Date.now(); } else mandar(true); };
    const alSalir = () => mandar(true);
    document.addEventListener("visibilitychange", alCambiar);
    window.addEventListener("pagehide", alSalir);
    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", alCambiar);
      window.removeEventListener("pagehide", alSalir);
      mandar(false); // cambio de página dentro de la web: no es rebote
    };
  }, [ruta]);
  return null;
}
