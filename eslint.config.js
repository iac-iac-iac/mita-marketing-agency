// @ts-check

// ESLint конфигурация для Next.js + TypeScript 6
// Упрощённая версия без строгой типизации

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "no-console": ["warn", {
        allow: ["warn", "error", "info"]
      }],
      "no-undef": "off", // Отключаем для TypeScript
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "no-unused-vars": "off", // TypeScript сам проверяет
    },
  },
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "coverage/",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
    ],
  },
];
