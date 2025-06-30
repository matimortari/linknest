import antfu from "@antfu/eslint-config"

export default antfu({
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
    "no-restricted-globals": "off",
    "regexp/no-obscure-range": "off",
    "node/prefer-global/process": "off",
    "vue/block-order": "off",
  },
})
