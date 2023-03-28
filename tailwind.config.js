/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**.{js,ts,jsx,tsx}", "./components/**.{js,ts,jsx,tsx}", "./pages/mc/**.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#FA8F54",
      light: "#F9F5EC",
      dark: "#484542",
      white: "#FFFFFF",
      red: "#F58865",
      green: "#7FD1AE",
      blue: "#789BF3",
    },
  },
  plugins: [],
};
