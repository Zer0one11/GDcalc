// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // или 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Используем Inter
      },
    },
  },
  plugins: [],
}
