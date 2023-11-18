/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    // "./pages/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBrown: "#F6CAA1",
        brown: "#CE9491",
        btColor: "#EE7D90",
        btHover: "#E28E9C",
        pink: "#E38A86",
        lightBlue: "#4DB5F0",
        blue: "#4979D1",
        white: "#fefefe",
        gray: "#C9C5C5",
        darkGray: "#5D5D5F",
        dark: "#14183E",
        red: "red",
        btnBrown: "#511523",
        bgColor: "#FCFCFC",
      },
    },
    fontFamily: {
      'm1c': ["M1c", 'sans-serif'],
    },
    fontSize: {
      xs: ["10px"],
      ms: ["14px"],
      md: ["17px"],
      sm: ["18px"],
      xl: ["20px"],
      f26:["26px"],
      "2xl": ["30px"],
      "3xl": ["35px"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
}

