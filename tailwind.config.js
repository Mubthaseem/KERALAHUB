/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#68dba9",
        "primary-container": "#25a475",
        "on-primary": "#003825",
        "on-primary-container": "#00311f",
        "background": "#0b1326",
        "surface": "#0b1326",
        "surface-bright": "#31394d",
        "surface-dim": "#0b1326",
        "surface-container-lowest": "#060e20",
        "surface-container-low": "#131b2e",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "surface-variant": "#2d3449",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#bccac0",
        "outline": "#87948b",
        "outline-variant": "#3d4a42",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "secondary": "#4edea3",
        "secondary-container": "#00a572"
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
