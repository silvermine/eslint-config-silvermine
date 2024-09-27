'use strict';

const typescriptESLintParser = require('@typescript-eslint/parser'),
      globals = require('globals');

module.exports = {
   languageOptions: {
      parserOptions: {
         parser: typescriptESLintParser,
         sourceType: 'module',
      },
      globals: {
         'vue/setup-compiler-macros': true,
         ...globals.browser,
      },
   },
};
