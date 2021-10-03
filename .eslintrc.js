module.exports = {
  root: true,
  env: {
    browser: true,
    es2015: true,
    node: true,
    jest: true
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  rules: {
    'space-before-function-paren': [0, 'always'],
    'semi': ["error", "always"],
    "spaced-comment": [0, "always"],
    "eol-last": ["off", "always"],
    "quotes": [1, "single", { "allowTemplateLiterals": true }]
  }
};