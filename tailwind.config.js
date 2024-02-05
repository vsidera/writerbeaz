/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}/",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      },
    },
  },
  plugins: [],
}

