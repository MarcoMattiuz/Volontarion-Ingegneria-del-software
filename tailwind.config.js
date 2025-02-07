/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '@/components/**/*.{html,js}',],
  theme: {
    extend: {
      colors:{
        dark: "rgba(var(--dark))",
        dark_hover: "rgba(var(--dark-hover))",
        light: "rgba(var(--light))",
        light_hover: "rgba(var(--light-hover))",
        active: "rgba(var(--active))",
      }
    },
  },
  plugins: [
    daisyui,
  ]
}

