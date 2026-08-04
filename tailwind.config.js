/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          red: '#dc2626',
          crimson: '#b91c1c',
          darkred: '#991b1b',
          blue: '#2563eb',
          cobalt: '#1d4ed8',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#0f172a',
          accent: '#0284c7'
        }
      },
      fontFamily: {
        mono: ['Space Grotesk', 'Courier New', 'monospace'],
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'radar-pulse': 'radarPulse 2s infinite ease-out',
        'beacon': 'beacon 1.5s infinite ease-in-out',
        'scan': 'scanLine 4s infinite linear'
      },
      keyframes: {
        radarPulse: {
          '0%': { transform: 'scale(0.8)', opacity: '1', boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
          '70%': { transform: 'scale(1.4)', opacity: '0.2', boxShadow: '0 0 0 15px rgba(220, 38, 38, 0)' },
          '100%': { transform: 'scale(1.6)', opacity: '0' }
        },
        beacon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
