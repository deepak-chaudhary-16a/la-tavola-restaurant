/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1420",
        panel: "#161c2c",
        panel2: "#1c2438",
        cream: "#f7f3ea",
        accent: "#c8262c",
        accent2: "#e5533b",
        gold: "#c9a24b",
        muted: "#9aa3b8",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

