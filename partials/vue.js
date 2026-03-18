'use strict';

const typescriptESLint = require('typescript-eslint'),
      globals = require('globals');

module.exports = {
   languageOptions: {
      parserOptions: {
         parser: typescriptESLint.parser,
         sourceType: 'module',
      },
      globals: {
         'vue/setup-compiler-macros': true,
         ...globals.browser,
      },
   },
};
