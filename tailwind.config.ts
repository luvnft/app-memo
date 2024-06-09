import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#1FB6FF",
        secondary: "#303138",
        danger: "#DA6257",
        success: "#7ACB91",
        warning: "#FFA759",
        base: "#12141C",
        foreground: "#FFFFFF",
        accent: "#1C1D25",
        disabled: "#26272E",
        link: "#1FB6FF",
      },
    },
  },
};
