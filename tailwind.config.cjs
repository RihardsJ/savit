/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
    backgroundImage: {
      savit: "url('src/images/savit-bg-image-1.png')",
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
    },
  },
  plugins: [],
};
