/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ebf4',
          200: '#c3d8e9',
          300: '#95bddd',
          400: '#609dcd',
          500: '#3c81bc',
          600: '#2a67a0',
          700: '#215180',
          800: '#1e446a',
          900: '#1c3a59',
          950: '#0f2438',
        },
        fuel: {
          coal: '#334155',
          gas: '#64748b',
          nuclear: '#7c3aed',
          hydro: '#0284c7',
          wind: '#0d9488',
          solar: '#d97706',
          bio: '#16a34a',
          other: '#94a3b8'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
