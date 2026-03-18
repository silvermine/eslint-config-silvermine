'use strict';

var RuleTester = require('eslint').RuleTester;

module.exports = {

   es6: function() {
      return new RuleTester({
         parserOptions: {
            'ecmaVersion': 2019,
         },
         env: {
            es6: true,
         },
      });
   },

   typeScript: function() {
      return new RuleTester({
         parser: require.resolve('@typescript-eslint/parser'),
         parserOptions: {
            'ecmaVersion': 2019,
            'sourceType': 'module',
            // Disable warning banner for possibly incompatible versions of TypeScript
            'loggerFn': false,
         },
         env: {
            es6: true,
         },
      });
   },

};
