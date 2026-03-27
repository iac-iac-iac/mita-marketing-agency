/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
}
