/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: { beauty: "1120px", global: "1360px" },
      fontFamily: {
        peydaMedium: ["peyda-Medium", "sans-serif"],
      },
      colors: {
        white: "#fff",
        black: "#181718",
        main: {
          primary: "#EB1086",
          secondary: "#FDE7F3",
          100: "#FFF2F7",
        },
        green: {
          primary: "#28A745",
          secondary: "#EAF6EC",
        },
        danger: {
          primary: "#DC3545",
          secondary: "#FCEBEC",
          500: "#DC3545",
        },
        yellow: {
          primary: "#FFC107",
          secondary: "#FFF9E6",
        },
        gray: {
          200: "#F5F5F5",
          300: "#FAFAFA",
          400: "#EDEDED",
          "card-border": "#E3E8EB",
          checkBox: "#D8D8D8",
          "radio-border": "#D1D1D6",
        },
        infoAlertBox: "#17A2B8",
        infoBgIcon: "#E8F6F8",
      },
      boxShadow: {
        xs: "0px 2px 8px 0px #030D4508",
        beauty_lg: "0px 4px 80px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
