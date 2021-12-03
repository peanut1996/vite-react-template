module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // 全局变量设置
  globals: {
    node: true,
  },
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  plugins: ['simple-import-sort', 'react'],

  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'off',
    'react/no-namespace': 'off',
    // 自动引入排序
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  settings: {
    react: {
      version: 'detect', // 表示探测当前 node_modules 安装的 react 版本
    },
  },
};
