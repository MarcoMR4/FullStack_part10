// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Ya está desactivado en eslint-config-expo, pero se puede reforzar aquí si se desea
      'react/prop-types': 'off',
      // Asegura el uso de punto y coma obligatorio
      'semi': 'error',
    },
  },
]);
