/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emirates: {
          red: '#C8102E',       // Signature Crimson Accent
          crimson: '#A6192E',   // Deep Crimson
          darkred: '#7E121D',   // Deep Burgundy
          gold: '#D4AF37',      // Restrained Luxury Gold
          sand: '#E6DFD5',      // Warm desert sand
        },
        navy: {
          950: '#0B0D14',       // Pitch aviation canvas
          900: '#111522',       // Panel primary surface
          850: '#151A2B',       // Card elevated surface
          800: '#1D2338',       // Secondary interactive surface
          750: '#252D47',       // Active border / highlighted element
          700: '#2E3856',       // Standard subtle border
          600: '#3D4A72',       // Hover border
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 16px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -2px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
