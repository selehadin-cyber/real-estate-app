/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "852px" },
        "1072": "1072px"
      },
      backgroundImage: {
        'gradient-bg':
          "linear-gradient(170deg, rgb(17 24 39) 0%, hsl(0, 0%, 6%) 30%)",
      }
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
