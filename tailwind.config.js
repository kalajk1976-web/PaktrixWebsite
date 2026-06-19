/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#00A650',
        'brand-teal': '#00B4D8',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #00C44A 0%, #00B4D8 100%)',
      },
    },
  },
  plugins: [],
};
