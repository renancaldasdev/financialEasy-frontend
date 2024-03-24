/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        buttton_confirm: 'rgba(0, 241.659, 225.287, 1)',
        buttton_cancel: 'rgba(193.724, 246.697, 255, 1)'
      }
    }
  },
  plugins: []
}
