/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#09090b',
        cardBg: '#18181b',
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        danger: '#f43f5e',
      },
    },
  },
  plugins: [],
}
