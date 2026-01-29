// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Import plugins
import securityPlugin from "eslint-plugin-security";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import promisePlugin from "eslint-plugin-promise";
import sonarjsPlugin from "eslint-plugin-sonarjs";

// Prettier integration
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Your custom plugins and rules
  {
    plugins: {
      security: securityPlugin,
      "unused-imports": unusedImportsPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      promise: promisePlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      // Enforce Prettier formatting
      "prettier/prettier": "error",

      // Security rules
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-unsafe-regex": "warn",

      // Performance & Clean Code
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "import/no-extraneous-dependencies": "warn",
      "import/no-cycle": "error",
      "import/no-unresolved": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Promises & async
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/catch-or-return": "warn",

      // Complexity & Maintainability
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/cognitive-complexity": ["warn", 15],

      // General Good Practices
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-alert": "error",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // Prettier plugin (runs Prettier as ESLint rule)
  eslintPluginPrettierRecommended,

  // Turn off rules that conflict with Prettier
  eslintConfigPrettier,
];

export default eslintConfig;
