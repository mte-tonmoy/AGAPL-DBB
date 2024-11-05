/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: [
    {
      mytheme: {
        primary: "#ea00b4",

        secondary: "#f4a700",

        accent: "#ff2e00",

        neutral: "#000901",

        "base-100": "#fffff1",

        info: "#0092ff",

        success: "#008700",

        warning: "#ffbe00",

        error: "#e61637",
      },
    },
  ],
  plugins: [require("daisyui")],
};
