module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    indent: 'off',
    camelcase: 'off',
  },
};
