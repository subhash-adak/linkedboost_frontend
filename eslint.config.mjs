// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// Import utilities to access ESLint's core rules
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const allRules = require("eslint/conf/all").rules;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Override all rules to disable them
  {
    rules: Object.fromEntries(
      Object.keys(allRules).map(rule => [rule, "off"])
    ),
  },
];

export default eslintConfig;