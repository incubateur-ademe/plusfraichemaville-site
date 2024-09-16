module.exports = {
  root: true,
  extends: ["eslint:recommended", "next", "prettier"],
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
    "react/jsx-key": "off",
    // indent: ["error", 2, { SwitchCase: 1, offsetTernaryExpressions: true }],
    "max-len": ["error", { code: 120 }],
    "no-tabs": ["error"],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  env: {
    jest: true,
  },
};
