/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      // 'chat-bg': "url('./src/assets/Home/Chat-bg.svg')",
      // 'footer-texture': "url('/img/footer-texture.png')",
    },
    screens: {
      'xs': '420px',
    },
  },
};
export const plugins = [];