/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{index,js}",
    "./components/**/*.{index,js}",
  ],
  theme: {
    extend: {
      colors: {
        VerdeButton: "#716E3E",
        VerdeLink: '#65A571',
        AzulButton: '#658088',
      },
    },
  },
  plugins: [],
}

