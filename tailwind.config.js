/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7fb",
          100: "#dce4f4",
          200: "#b9c8e8",
          300: "#8ea4d6",
          400: "#6a82c4",
          500: "#4d63b4",
          600: "#3c4f96",
          700: "#30407a",
          800: "#283565",
          900: "#222c54"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 15px 35px -15px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: [],
};
