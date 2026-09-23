/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       gridTemplateColumns: {
        19: "repeat(19, minmax(0, 1fr))",
      },
      // one navy for the whole app, instead of several close-but-different shades
      colors: {
        navy: {
          DEFAULT: "#031e3d",
          dark: "#052a5a",
        },
      },
    },
  },
  plugins: [],
}
