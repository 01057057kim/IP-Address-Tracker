/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'v-d-gray' : 'hsl(0, 0%, 17%)',
        'd-gray' : 'hsl(0, 0%, 59%)',
      },
      fontFamily:
      {
        'rubik' : "Rubik,sans-serif",
      },
    },
  },
  plugins: [],
}
