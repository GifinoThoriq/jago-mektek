import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      lightgray: "#FAFAFA",
      gray: "#737373",
      blue: {
        light: "#00509D",
        dark: "#252B42",
      },
      red: "#dc2626",
      green: "#22c55e"
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2.5rem",
      "4xl": "3.75rem",
    },
    screens: {
      sm: "576px",
      md: "960px",
      lg: "1200px",
    },
    extend: {},
  },
  plugins: [],
};

export default config;
