module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': 'off',

    // Airbnb / Import
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal'],
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'import/no-unresolved': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      json: 'always',
    }],

    // Node.js plugin
    'node/no-extraneous-require': 'error',
    'node/no-missing-require': 'error',
  },
};
