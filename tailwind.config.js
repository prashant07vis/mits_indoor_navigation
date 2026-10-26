/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mits: {
          navy: '#0f172a',
          blue: '#1e3a8a',
          teal: '#0d9488',
          gold: '#f59e0b',
          accent: '#e11d48',
          slate: '#334155',
          light: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
};