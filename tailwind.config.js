/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1152d4",
        "bg-dark": "#101622",
        "bg-light": "#f6f6f8",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
      animation: {
        bounce200: 'bounce 1s infinite',
        bounce400: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
