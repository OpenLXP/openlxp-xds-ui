module.exports = {
  plugins: [require("@tailwindcss/line-clamp")],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        "2xs": ".65rem",
      },
      colors: {
        "base-blue": "#005ea2",
        "bright-blue": "#008cf0",
        "light-blue": "#2f6194",
        "dark-blue": "#0b3d70",
        "body-gray": "#f4f4f4",
        "icon-blue": "#337ab7",
      },
      fontFamily: {
        serif: ["Times New Roman"],
      },
      backgroundImage: (theme) => ({
        "header-img": 'url("/src/resources/internal/dodBanner.png")',
      }),
    },
  },
  variants: {
    extend: {},
  },
};
