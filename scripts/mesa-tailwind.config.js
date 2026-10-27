// CSS de la mesa de control. Desde la raíz del proyecto, con Tailwind 3.4:
//   npx tailwindcss@3.4.17 -c scripts/mesa-tailwind.config.js -i <(printf "@tailwind base;@tailwind components;@tailwind utilities;") -o /tmp/out.css --minify
// y pegar /tmp/out.css debajo de las 19 primeras líneas (el reset) de app/mesa-tc-6v9k3p/mesa.css.
module.exports = {
  content: ["./components/mesa/Mesa.tsx", "./components/mesa/Alegria.tsx", "./components/mesa/Suenos.tsx"],
  important: "#mesa-rd",
  corePlugins: { preflight: false },
  theme: { extend: {
    colors: { teal: "#2C7C98", "teal-deep": "#236278", "teal-mid": "#5AAABF", "teal-soft": "#8CC4D3", "teal-pale": "#C5E2EB", "teal-dark": "#1a3d47", ink: "#1a3d47", yellow: "#FFDE00", cream: "#FBFAF7", arena: "#F6EDE6", "arena-deep": "#EADBD0", paper: "#fffdf9", line: "#e9e2d4", amber: "#b8924a", "amber-deep": "#7c5e27", "amber-soft": "#efe2c4", "amber-line": "#e6d5b0", brown: "#5e3a1f" },
    fontFamily: { sans: ["var(--font-roboto)", "system-ui", "sans-serif"], serif: ["var(--font-lora)", "Georgia", "\"Times New Roman\"", "serif"] },
    borderRadius: { cta: "4px" }, maxWidth: { content: "1180px", prose: "720px" }, lineHeight: { relaxed: "1.65" },
  } },
};
