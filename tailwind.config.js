/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        blue: colors.blue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite-vue'),
    require('flowbite/plugin'),
  ],
}

