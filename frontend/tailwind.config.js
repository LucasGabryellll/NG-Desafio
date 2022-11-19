/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryLight: 'hsla(212, 100%, 75%, 1)',
        primary: 'hsla(212, 100%, 735%, 1)',
        primaryDark: 'hsla(212, 100%, 40%, 1)',

        primaryRed: 'hsla(1, 100%, 65%, 1)',
        primaryRedLight: 'hsla(1, 100%, 50%, 1)',
        primaryRedDark: 'hsla(4, 100%, 45%, 1)'
      }
    },
  },
  plugins: [],
}
