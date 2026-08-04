/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kerala: {
          green: '#047857',
          emerald: '#10b981',
          red: '#dc2626',
          darkred: '#991b1b',
          blue: '#2563eb',
          navy: '#0f172a',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'monospace']
      }
    },
  },
  plugins: [],
}
