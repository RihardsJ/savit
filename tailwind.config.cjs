/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: 'white',
      brown: '#BF7E3A',
      grey: '#3D3F3E',
      sky: '#9fafaf',
      formBG: '#D3D3D1',
    },
    backgroundImage: {
      savit: "url('/public/images/savit-bg-image-1.png')",
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
    },
  },
  plugins: [],
};
