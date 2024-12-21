/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669'
        },
        gray: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        yellow: {
          400: '#fbbf24',
          500: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}
