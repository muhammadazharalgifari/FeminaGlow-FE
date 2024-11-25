/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"], // Menambahkan font Pacifico
        // menambahkan font popins
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
