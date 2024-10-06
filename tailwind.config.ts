import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin.js";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        // primary: "rgb(230 0 122)",
        // secondary: "#303138",
        // danger: "#ff0505",
        // success: "#10b981",
        // warning: "#ffc302",
        // base: "#FFFFFF",
        // foreground: "rgb(230 0 122)",
        // accent: "rgb(28, 5, 51)",
        // disabled: "#949494",
        // link: "#1FB6FF",

        "bg-card": "var(--bg-card)",
        "bg-persistent": "var(--bg-persistent)",

        "text-color": "rgb(var(--text-color) / <alpha-value>)",
        "text-color-inverse": "var(--text-color-inverse)",
        "border-color": "var(--border-color)",
        "background-color": "var(--background-color)",
        "background-color-inverse": "var(--background-color-inverse)",
        "link-hover": "var(--link-hover)",
        "k-accent": "var(--k-accent)",
        "k-accent2": "var(--k-accent2)",
        "k-accent-light": "var(--k-accent-light)",
        "k-accent-hover": "var(--k-accent-hover)",
        "k-accent-light-2": "var(--k-accent-light-2)",
        "k-accent-light-2-dark": "var(--k-accent-light-2-dark)",
        "k-accent-light-2-dark-head": "var(--k-accent-light-2-dark-head)",
        "k-accent-light-2-dark-paragraph": "var(--k-accent-light-2-dark-paragraph)",
        "k-accent-light-3": "var(--k-accent-light-3)",
        "k-green": "var(--k-green)",
        "k-red": "var(--k-red)",
        "k-orange": "var(--k-orange)",
        "k-orange-light": "var(--k-orange-light)",
        "k-orange2": "var(--k-orange2)",
        "k-orange3": "var(--k-orange3)",
        "k-orange4": "var(--k-orange4)",
        "k-red-accent": "var(--k-red-accent)",
        "k-red-accent-2": "var(--k-red-accent-2)",
        "k-grey": "var(--k-grey)",
        "k-grey-fix": "var(--k-grey-fix)",
        "k-grey-light": "rgb(var(--k-grey-light) / <alpha-value>)",
        "k-pink": "var(--k-pink)",
        "k-yellow": "var(--k-yellow)",
        "k-yellow-light": "var(--k-yellow-light)",
        "k-blue-accent": "var(--k-blue-accent)",
        "k-aqua-blue": "var(--k-aqua-blue)",
        "k-green-accent": "var(--k-green-accent)",
        "k-green-accent-2": "var(--k-green-accent-2)",
        "k-hover-grey": "var(--k-hover-grey)",
        "k-blue": "var(--k-blue)",
        "k-blue-hover": "var(--k-blue-hover)",
        "k-blue-light": "var(--k-blue-light)",
        "k-primary": "var(--k-primary)",
        "k-primary-light": "var(--k-primary-light)",
        "k-shade": "rgb(var(--k-shade) / <alpha-value>)",
        "k-shade2": "var(--k-shade2)",
        "placeholder-color": "var(--placeholder-color)",
        disabled: "var(--disabled)",
        "card-border-color": "var(--card-border-color)",
        "card-border-color-light": "var(--card-border-color-light)",
        "green-border-color": "var(--green-border-color)",
        "blue-accent-bg-color": "var(--blue-accent-bg-color)",
        "blue-light-hover-color": "var(--blue-light-hover-color)",
        "separator-line-color": "var(--separator-line-color)",
        "toggle-primary": "var(--toggle-primary)",
        "toggle-active-switch": "var(--toggle-active-switch)",
        "purple-light-color": "var(--purple-light-color)",
        "purple-dark-color": "var(--purple-dark-color)",
        "steps-active-color": "rgb(var(--steps-active-color) / <alpha-value>)",

        neutral: {
          1: "#ffffff",
          2: "#fcfcfc",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#454545",
          10: "#262626",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-delay": (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme("transitionDelay") },
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-duration": (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme("transitionDuration") },
      );
    }),
  ],
};
