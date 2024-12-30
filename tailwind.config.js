/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#e2c765',
        'primary-2': '#c7a647',
        'dark-1': '#2e2e2e',
        'dark-2': '#232323',
        'dark-3' : '#333',
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Add this plugin for scrollbar-hide
    // require('@tailwindcss/forms'), // Optional: Useful for styling forms
  ],
};
