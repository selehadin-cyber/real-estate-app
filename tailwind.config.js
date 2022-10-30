/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        "tablet": "800px",
        "500": "500px",
        "xs": {'max': '683px'},
        "xxs": "100px"
      }
    },
  },
  plugins: [],
}
