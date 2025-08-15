import antfu from "@antfu/eslint-config"
import pluginTailwindCSS from "eslint-plugin-tailwindcss"

export default antfu({
  plugins: { tailwindcss: pluginTailwindCSS },
  vue: true,
  typescript: true,
  jsonc: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: false,
  },
  rules: {
    "no-new": "off",
    "no-undef": "off",
    "no-alert": "off",
    "no-console": "off",
    "node/prefer-global/process": "off",
    "vue/block-order": ["error", { order: ["template", "script", "style"] }],
    "vue/html-closing-bracket-newline": ["error", { multiline: "always", singleline: "never" }],
    "vue/max-attributes-per-line": ["warn", { singleline: { max: 4 }, multiline: { max: 2 } }],
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/enforces-shorthand": "warn",
    "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    "tailwindcss/no-custom-classname": "off",
  },
})
