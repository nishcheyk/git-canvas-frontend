/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#050510',
          dark: '#03030b',
          light: '#0c0c20',
          border: '#1b1b3a',
          accent: '#6366F1',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 15px rgba(99, 102, 241, 0.4)',
        'glow-sun': '0 0 30px rgba(255, 153, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
