import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import path from "path";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);


const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const airbnbConfig = compat.extends("airbnb-base", "airbnb-typescript/base").map((config) => {
  if (config.rules) {
    const rulesToRemove = [
      "@typescript-eslint/brace-style",
      "@typescript-eslint/comma-dangle",
      "@typescript-eslint/comma-spacing",
      "@typescript-eslint/func-call-spacing",
      "@typescript-eslint/indent",
      "@typescript-eslint/keyword-spacing",
      "@typescript-eslint/lines-between-class-members",
      "@typescript-eslint/no-extra-parens",
      "@typescript-eslint/no-extra-semi",
      "@typescript-eslint/object-curly-spacing",
      "@typescript-eslint/padding-line-between-statements",
      "@typescript-eslint/quotes",
      "@typescript-eslint/semi",
      "@typescript-eslint/space-before-blocks",
      "@typescript-eslint/space-before-function-paren",
      "@typescript-eslint/space-infix-ops",
    ];
    rulesToRemove.forEach((rule) => {
      delete config.rules[rule];
    });
  }
  return config;
});

/** @type {import('eslint').Linter.Config[]} */
export const base = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...airbnbConfig,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.es2022,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "import/prefer-default-export": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "class-methods-use-this": "off",
      "no-console": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "max-len": "off",
      "no-restricted-syntax": "off",
      "consistent-return": "off",
      "default-case": "off",
      "@typescript-eslint/naming-convention": "off",
      "no-multiple-empty-lines": ["error", { max: 3, maxEOF: 1 }],
      "@stylistic/padding-line-between-statements": "off"
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/", ".next/", ".turbo/", "coverage/"],
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const node = [
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const nextjs = [
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
