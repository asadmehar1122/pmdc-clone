/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/layouts/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pmdcBlue: '#0A65A0',
        pmdcSky: '#1191BD',
        pmdcLight: '#1CABE9',
        pmdcGold: '#F5D76E',
        pmdcInk: '#2F3D48',
        pmdcGray: '#556080',
      },
      boxShadow: {
        soft: '0 3px 20px rgb(0 0 0 / 19%)',
      },
    },
  },
  plugins: [],
}
