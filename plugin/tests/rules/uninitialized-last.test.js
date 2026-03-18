/**
* @fileoverview Check that uninitialized var declarations come last.
*/
'use strict';

var rule = require('../../rules/uninitialized-last'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample, validExample;

validExample = formatCode(
   'var myArray = [],',
   '    myObj;',
   '',
   'var var1, var2;',
   '',
   'var num1 = 1,',
   '    num2 = 2,',
   '    num3, num4, num5;',
   '',
   'var num6 = 1, var3;'
);

invalidExample = formatCode(
   'var var1,',
   '    var2 = 4;',
   '',
   'var num1, num2, num3 = 1;',
   '',
   'var a = 5,',
   '    b,',
   '    c = 6;',
   '',
   'var d = 2, e, c, f = 1;'
);


ruleTester.run('uninitialized-last', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'Uninitialized variables should come last in the declaration.',
               type: 'VariableDeclaration',
            },
            {
               message: 'Uninitialized variables should come last in the declaration.',
               type: 'VariableDeclaration',
            },
            {
               message: 'Uninitialized variables should come last in the declaration.',
               type: 'VariableDeclaration',
            },
            {
               message: 'Uninitialized variables should come last in the declaration.',
               type: 'VariableDeclaration',
            },
         ],
      },
   ],
});
