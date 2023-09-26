/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:"#b82308",
        content:"#545454",
        greyAccent:"#EDEDED",
        greyContent:"#939393"
      }
    },
  },
  plugins: [],
}
