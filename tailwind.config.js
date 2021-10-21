module.exports = {
  plugins: [require('@tailwindcss/line-clamp')],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'inner-sm': 'inset 1px 1px 3px rgba(0,0,0,0.2)',
      },
    },
  },
  variants: {
    extend: {},
  },
};
