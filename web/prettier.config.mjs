// prettier.config.mjs

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  // Maximum line length for readability (soft wrap)
  printWidth: 100,

  // Use 2 spaces for indentation (standard in most frontend projects)
  tabWidth: 2,

  // Use spaces instead of tabs
  useTabs: false,

  // Add semicolons at the end of statements
  semi: true,

  // Use single quotes for JS/TS (except to avoid escaping)
  singleQuote: false,

  // Use single quotes instead of double quotes in JSX.
  jsxSingleQuote: false,

  // Trailing commas where valid in ES5 (objects, arrays, etc.)
  trailingComma: "es5",

  // Print spaces between brackets in object literals.
  bracketSpacing: true,

  // Keep as multi-line, if there is a newline between the opening brace and first property.
  objectWrap: "preserve",

  // Put closing bracket on the same line if the element is single-line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: "always",

  // Respect existing formatting for markdown tables and prose
  proseWrap: "preserve",

  // Optional: Treat HTML inside template literals correctly
  htmlWhitespaceSensitivity: "css",

  // Handle end-of-line characters automatically across OS
  endOfLine: "lf",

  // Format embedded HTML, JSON, Markdown, etc.
  embeddedLanguageFormatting: "off",

  // Enforce single attribute per line.
  singleAttributePerLine: true,

  // Custom import order configuration
  importOrder: [
    "^react$",
    "<BUILTIN_MODULES>",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^@/lib(/.*)?$",
    "^@/hooks(/.*)?$",
    "^@/providers(/.*)?$",
    "^@/components(/.*)?$",
    "^@/.*$",
    "^#site(/.*)?$",
    "^@/styles(/.*)?$",
    "^[./]",
  ],

  // Separate import groups with new lines.
  importOrderSeparation: true,

  // Sort specifiers in an import declaration.
  importOrderSortSpecifiers: true,

  // Sort import statements by length (shortest to longest).
  importOrderSortByLength: "asc",

  // Group namespace specifiers together.
  importOrderGroupNamespaceSpecifiers: true,

  plugins: [
    // Plugin that automatically sorts import statements.
    "@trivago/prettier-plugin-sort-imports",
    // Plugin that automatically sorts tailwind classes.
    "prettier-plugin-tailwindcss",
    // Plugin that wraps verbose class name based on the printWidth option.
    "prettier-plugin-classnames",
    // Plugin that sequentially merges the formatting results of the above Prettier plugins.
    "prettier-plugin-merge",
  ],
};
