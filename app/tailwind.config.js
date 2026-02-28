/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wakfu: {
          bg: '#0a0e1a',
          surface: '#111827',
          card: '#1a2236',
          border: '#2d3748',
          gold: '#f6ad1c',
          'gold-light': '#fde68a',
          accent: '#6366f1',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
      },
    },
  },
  plugins: [],
}
