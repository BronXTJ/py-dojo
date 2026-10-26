import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";
export default tseslint.config(
  { ignores: ["dist", "tests", "scripts", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  { files: ["src/**/*.{ts,tsx}"], languageOptions: { globals: { ...globals.browser } }, plugins: { "react-hooks": hooks }, rules: { ...hooks.configs.recommended.rules, "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }] } },
  { files: ["src/**/*.test.ts"], rules: { "@typescript-eslint/no-non-null-assertion": "off" } },
);
