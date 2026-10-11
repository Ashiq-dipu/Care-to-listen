/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f3ed",
        vermilion: "#ff3311",
        cobalt: "#165af6",
        acidYellow: "#e4ff37",
        sand: "#ece8df",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        sub: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
