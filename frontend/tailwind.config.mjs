import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "night"], // enable themes
  },
}
