/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e2c765',
        charcoalGray: '#2e2e2e',
        buttonCta: '#c7a647',
        linkIcons: '#6574e2',
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Add this plugin for scrollbar-hide
    // require('@tailwindcss/forms'), // Optional: Useful for styling forms
  ],
};
