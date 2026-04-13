import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react/forbid-dom-props blocks `style` as a blanket rule, but dynamic CSS
    // custom property values (e.g. `var(--cat-football)`) cannot be expressed as
    // Tailwind classes — inline style is the only correct approach in those cases.
    rules: {
      "react/forbid-dom-props": "off",
    },
  },
]);

export default eslintConfig;
