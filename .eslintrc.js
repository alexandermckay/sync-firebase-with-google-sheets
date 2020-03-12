module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'implicit-arrow-linebreak': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0
  }
};
