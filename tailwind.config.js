/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lattafa: {
          dark: "#121212",
          gold: "#d4af37",
          goldHover: "#b89628",
          greyBg: "#f6f6f6",
          lightBorder: "#e5e5e5",
          redBadge: "#d63031"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
