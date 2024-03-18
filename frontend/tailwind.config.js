/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-gray': '#B2BEB5', // Adjust the hex code to the shade you prefer
      },
    },
  },
  plugins: [],
}