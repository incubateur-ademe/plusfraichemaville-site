import { defineConfig } from "eslint/config";
import pluginNext from "@next/eslint-plugin-next";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    settings: {
      pluginNext: {
        rootDir: ["src/app/*/"],
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...pluginNext.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
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
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [
      ".next/**",
      ".env",
      "node_modules",
      "public/**",
      "next.config.js",
      "postcss.config.js",
      "src/lib/strapi/types/*",
      "src/generated/prisma/client/*",
      "tailwind.config.js",
      "next-env.d.ts",
    ],
  },
]);
