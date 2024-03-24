const path = require('path');

module.exports = {
  root: true,
  plugins: [
    'testing-library', // React Testing Library 모범사례 추천
    'import',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'unicorn',
    'react-refresh',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/display-name': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/semi': 2,
    '@typescript-eslint/no-floating-promises': 2,
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignoreTernaryTests: false,
      },
    ],
    'unicorn/prefer-switch': [
      'error',
      { minimumCases: 3, emptyDefaultCase: 'no-default-case' },
    ],
    'unicorn/explicit-length-check': 2,
    'unicorn/no-array-for-each': 0,
    'unicorn/no-for-loop': 2,
    'unicorn/prefer-array-some': 2,
    'unicorn/prefer-date-now': 2,
    'unicorn/prefer-includes': 2,
    'unicorn/prefer-spread': 2,
    'unicorn/numeric-separators-style': 2,
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['errorHandler', 'apiErrorHandler'] },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        types: ['array', 'function', 'number', 'string'],
        format: ['camelCase', 'PascalCase'],
        filter: {
          regex: '^_',
          match: false,
        },
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['camelCase'],
        custom: {
          regex: '^(is|should|has|can|did)|(ed|ble)$',
          match: true,
        },
      },
      {
        selector: 'variable',
        types: ['boolean'],
        modifiers: ['unused'],
        format: ['camelCase'],
        prefix: ['_'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'typeProperty',
        format: null,
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-non-null-assertion': 0,
    'arrow-body-style': ['off', 'never'],
    'lines-between-class-members': 'off',
    'no-shadow': 'off', // replaced by ts-eslint rule below
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'max-classes-per-file': 'off',
    'no-void': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'require-await': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      alias: {
        map: [
          ['~', path.resolve(__dirname, './src')],
          ['~modules', path.resolve(__dirname, './src/modules/')],
          ['@app-info', path.resolve(__dirname, './app-info.json')],
        ],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: [
        '**/*/test/**/*',
        '**/?(*.)+(spec|test).[jt]s?(x)',
        '**/*/mocks/**/*',
        '**/*/test-utils/**/*',
        'vite.config.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist',
    '**/*.js',
    '**/*.cjs',
    'setUpTests.ts',
  ],
};
