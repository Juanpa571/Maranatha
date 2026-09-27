/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7E04A1', // Color oficial primario RGB 7E04A1
          lilac: '#E7D1FF',  // Color oficial secundario RGB E7D1FF
          muted: '#DBC9DF',  // Color oficial terciario RGB DBC9DF
          deep: '#5E0279',
          lavender: '#834698',
          plum: '#713186',
        },
      },
      fontFamily: {
        peridot: ['Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
