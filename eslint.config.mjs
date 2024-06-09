// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-empty": "error",
    "vue/html-self-closing": "off",
    "vue/no-multiple-template-root": "off",
  },
});
