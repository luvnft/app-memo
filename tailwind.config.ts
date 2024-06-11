import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "rgb(230 0 122)",
        secondary: "#303138",
        danger: "#ff0505",
        success: "#10b981",
        warning: "#ffc302",
        base: "#FFFFFF",
        foreground: "rgb(230 0 122)",
        accent: "rgb(28, 5, 51)",
        disabled: "#949494",
        link: "#1FB6FF",
      },
    },
  },
};
