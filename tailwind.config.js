/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50":"#efb573", // pagination active bg
          "100":"#efb573", // pagination active hover
          "200":"#d97706",
          "300":"#d97706",
          "400":"#d97706",
          "500":"#e89f4c", // search focus
          "600":"#d97706", // checkbox bg
          "700":"#e88617", // button bg
          "800":"#d97706",
          "900":"#d97706"
        }
      } //d97706
    },
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite-vue'),
    require('flowbite')
  ],
}

