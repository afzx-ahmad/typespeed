import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary:  colors.yellow,
        secondary: colors.slate
      }
    },
  },
  plugins: [],
}

