module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier'],
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersions: 9,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-console': 'off',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-return-assign': ['error', 'always'],
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-await': 'error',
    'init-declarations': 'error',
    'no-shadow': 'error',
    'global-require': 'error',
    'handle-callback-err': ['error', '^.*(e|E)rr'],
    'no-buffer-constructor': 'error',
    'no-mixed-requires': 'error',
    'no-path-concat': 'error'
  }
};
