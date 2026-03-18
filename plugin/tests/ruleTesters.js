'use strict';

var RuleTester = require('eslint').RuleTester,
    typescriptESLint = require('typescript-eslint');

module.exports = {

   es6: function() {
      return new RuleTester({
         languageOptions: {
            ecmaVersion: 2019,
            sourceType: 'script',
         },
      });
   },

   typeScript: function() {
      return new RuleTester({
         languageOptions: {
            parser: typescriptESLint.parser,
            ecmaVersion: 2019,
            sourceType: 'module',
            parserOptions: {
               warnOnUnsupportedTypeScriptVersion: false,
            },
         },
      });
   },

};
