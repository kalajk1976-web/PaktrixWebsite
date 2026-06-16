/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#0d9e6d',
        'brand-teal': '#14b8a6',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0d9e6d 0%, #14b8a6 100%)',
      },
    },
  },
  plugins: [],
};
