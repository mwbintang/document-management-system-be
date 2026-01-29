module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },

  plugins: ['@typescript-eslint', 'import'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],

  env: {
    node: true,
    es2020: true
  },

  rules: {
    /* ---- TypeScript ---- */
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'off',

    /* ---- Sequelize decorators friendliness ---- */
    '@typescript-eslint/ban-types': 'off',

    /* ---- Imports ---- */
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],

    /* ---- Style ---- */
    'no-console': 'off'
  },

  ignorePatterns: [
    'dist/',
    'node_modules/',
    'migrations/',
    'seeders/'
  ]
};
