/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-focus': '#101010',
        'custom-blue': '#F0F0F0',
        'custom-gray': '#303030',
      },
      borderRadius: {
        'custom': '15px',
      },
      fontSize: {
        'small': '0.8rem',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '*': {
          boxSizing: 'border-box',
        },
        '*::before': {
          boxSizing: 'border-box',
        },
        '*::after': {
          boxSizing: 'border-box',
        },
      });
    },
  ],
}