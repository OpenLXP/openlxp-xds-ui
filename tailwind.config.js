module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'base-blue':'#005ea2',
        'bright-blue':'#008cf0',
        'dark-blue':'#003a63'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
