/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BFFF',
        secondary: '#00FF7F',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}