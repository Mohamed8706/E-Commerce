/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html.js,jsx,ts,tsx}',],
  theme: {
    extend: {
      boxShadow: {
        custom: 'rgba(0, 0, 0, 0.04) 0px 5px 22px;',
      },
    },
  },
  plugins: [],
}

