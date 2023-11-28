/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-color': '#6d6d6d',
      },
      backgroundImage: {
        'body-image': "url('https://www.transparenttextures.com/patterns/cardboard-flat.png')",
      },
      padding: {
        '1/5': '20%'
      }
    },
  },
  plugins: [],
}

