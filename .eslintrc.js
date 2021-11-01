const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'prettier/react', '@react-native-community'],
  plugins: [
    'prettier',
    'redux-saga',
    'react',
    'react-hooks',
    'node',
    'promise',
    'react-native',
    'react-native-a11y',
    'detox',
  ],
  env: {
    jest: true,
    node: true,
    es6: true,
    'react-native/react-native': true,
    'detox/detox': true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'react-hooks/exhaustive-deps': 1,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'react/prop-types': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'default-case': 0,
    'react/no-multi-comp': 0,
    'react/jsx-filename-extension': 0,
  },
};
