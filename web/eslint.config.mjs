// eslint.config.mjs
import globals from "globals";
import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";
import importPlugin from "eslint-plugin-import";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import unusedImports from "eslint-plugin-unused-imports";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  // Next.js recommended rule sets (flat config arrays)
  ...nextVitals,
  ...nextTs,

  // Make ESLint + Prettier cooperate
  prettier,
  prettierPluginRecommended,

  // Override default ignores (Next documents these defaults)
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]), // [page:1]

  // Your project-wide quality rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
      sonarjs,
      security,
    },
    rules: {
      // Security / bug patterns
      ...(security.configs?.recommended?.rules ?? {}),
      ...(sonarjs.configs?.recommended?.rules ?? {}),

      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      eqeqeq: ["error", "smart"],

      // Imports hygiene
      "import/no-duplicates": "error",
      "import/newline-after-import": "warn",

      // Remove unused code reliably
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Disable core unused-vars (we delegate to unused-imports)
      "no-unused-vars": "off",
    },
  },
]);
