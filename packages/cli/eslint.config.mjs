import { node } from "@ivannikov-pro/config-eslint";

export default [
  ...node,
  {
    rules: {
      "no-await-in-loop": "off",
      "no-restricted-syntax": "off",
      "no-underscore-dangle": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
];
