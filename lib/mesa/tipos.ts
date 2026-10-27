import type { Luz } from "@/lib/mesa/textos";
export type { Luz };
/* Las piezas de la mesa (iguales que en la de Reformadísimo, el modelo). */
export type Modulo = {
  id: string; titulo: string; que: string; luz: Luz; conclusion: string;
  estado?: string; // palabra de estado si no vale la del color (p. ej. "Medición incompleta", "En curso")
  ver?: string;    // texto del botón de la batería
  filas: { t: string; v: string; luz?: Luz }[];
  enlaces: { t: string; href: string }[];
};
export type Reloj = { t: string; v: string; sub: string; lleno: number; luz: Luz; ayuda?: string; frase?: string; detalle?: string };
export type Tarea = { id: string; texto: string; porque: string; donde?: string; ir?: string; titular?: string; boton?: string };
export type Resumen = { titulo: string; texto: string; puntos?: string[] };
