/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      light: ['InterLight'],
      regular: ['InterRegular'],
      medium: ['InterMedium'],
      semiBold: ['InterSemiBold'],
      bold: ['InterBold'],
      extrabold: ['InterExtraBold'],
      black: ['InterBlack'],
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    extend: {
      colors: {
        primaryColor: '#299D91',
        defaultBlack: '#191919',
        secondary: '#525256',
        gray01: '#666666',
        gray02: '#878787',
        gray03: '#9f9f9f',
        gray04: 'rgba(255, 255, 255, 0.7)',
        gray05: '#e8e8e8',
        gray06: '#f3f3f3',
        specialRed: '#e73d1c',
        specialGreen: '#4daf6e',
        specialBg: '#d2d2d2',
        specialBlack: 'rgba(255, 255, 255, 0.08)'
      }
    }
  },
  plugins: []
}
