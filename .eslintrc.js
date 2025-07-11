module.exports = {
  root: true,
  extends: ["eslint:recommended", "next", "prettier", "plugin:@creedengo/recommended"],
  globals: {
    JSX: "readonly",
  },
  settings: {
    next: {
      rootDir: ["src/app/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "max-len": [
      1,
      120,
      2,
      {
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
        ignoreUrls: true,
      },
    ],
    "no-tabs": ["error"],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@creedengo/provide-print-css": "off",
  },
  env: {
    jest: true,
  },
};
