module.exports = {
  root: true,
  extends: [
    // '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    plugins: ['import'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          alias: {
          "_assets": "./src/assets",
          "_actions": "./src/actions",
          "_reducers": "./src/reducers",
          "_utils": "./src/utils",
          "_config": "./src/config",
          "_navigations":"./src/navigations",
          "_services":"./src/services",
          "_components": "./src/components",
          "_containers": "./src/containers",
          "_screens": "./src/screens",
          },
        },
      },
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier', '@typescript-eslint', 'react-hooks'],
  rules: {
    'no-nested-ternary': 0,
    semi: [1, 'always'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', 'ts', 'tsx'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
  },
};
