module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'standard',
    'eslint-config-prettier',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react'],
  rules: {
    'prefer-const': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-const-assign': 'error',
    'no-console': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    camelcase: 'off',
  },
}
