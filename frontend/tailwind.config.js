/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./pages/**/*.{html,js,ts,vue}",
    "./pages/**/**/*.{html,js,ts,vue}",
    "./components/*.{html,js,ts,vue}",
    "./components/**/*.{html,js,ts,vue}",
    "./views/**/*.{html,js,ts,vue}",
    "./data/**/*.{html,js,ts,vue}",
    "./*.{html,js,ts,vue}",
    "./modules/*.{html,js,ts,vue}",
    "./modules/**/*.{html,js,ts,vue}",
    "./modules/**/**/*.{html,js,ts,vue}",
    "./modules/**/**/**/*.{html,js,ts,vue}",
    "./modules/**/**/**/**/*.{html,js,ts,vue}",
    "./modules/**/**/**/**/**/*.{html,js,ts,vue}",
    "./modules/**/**/**/**/**/**/*.{html,js,ts,vue}",
    "./modules/**/**/**/**/**/**/**/*.{html,js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '0.5rem',
        '3xs': '0.375rem',
      },
    },
  },
  plugins: [],
}

