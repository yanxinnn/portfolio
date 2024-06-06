import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.*"],
  theme: {
    extend: {
      colors: {
        stone: {
          450: "#9c9692",
          550: "#68625D",
        },
        neutral: {
          150: "#EDEDED",
        },
        earthy: {
          50: "#ffede9",
          100: "#e7d0cd",
          200: "#d0b3b0",
          300: "#bb9691",
          400: "#a67873",
          500: "#8c5f59",
          600: "#6e4a44",
          700: "#503431",
          800: "#331f1c",
          900: "#1a0703",
        },
        accent: "#E3536D",
        lightAccent: {
          100: "#F2CCC5",
          200: "#ECB6AC",
          300: "#E68777",
        },
      },
      fontFamily: {
        header: ['"Space Grotesk"', "sans-serif"],
        body: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
