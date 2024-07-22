/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cls: {
        clss: "bg-gray shadow-lg transition-all ease-in duration-100 bg-opacity-[13%] backdrop-blur-lg backdrop-filter border-b border-[#ababab]",
      },
    },
    colors: {
      gray: "#e5e5dc",
      glass: "rgba(255,255,255,0.45)",
      transparentBlack: "rgba(0,0,0,0.7)",
    },
    screens: {
      ss: "480px",
      sm: "600px",
      md: "768px",
      lg: "1099px",
    },
    boxShadow: {
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
    },
  },
  plugins: [],
};
