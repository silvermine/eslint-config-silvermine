/**
* @fileoverview Check that no array or object declarations span multiple lines.
*/
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../rules/no-multiline-var-declaration'),
    formatCode = require('../code-helper'),
    ruleTester = require('../ruleTesters').es6(),
    invalidExample, invalidExample2, validExample,
    validSingleConst, invalidSingleConst, invalidSingleConst2;

validExample = formatCode(
   'var myArray = [],',
   '    myObj = { a: 1, b: 2 };',
   '',
   'myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

invalidExample = formatCode(
   'var myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

invalidExample2 = formatCode(
   'var myArray = [],',
   '    myObj = {',
   '     a: 1,',
   '     b: 2,',
   '     c: 3,',
   '    }'
);

validSingleConst = formatCode(
   'const MY_INT = 1;',
   '',
   'const MY_CONST = {',
   '   a: 1,',
   '   b: 2,',
   '   c: 3',
   '};'
);

invalidSingleConst = formatCode(
   'const MY_INT = 1,',
   '      MY_CONST = {',
   '         a: 1,',
   '         b: 2,',
   '         c: 3',
   '      };'
);

invalidSingleConst2 = formatCode(
   'let myLetVar = [',
   '   1,',
   '   2,',
   '   3',
   '];',
   '',
   'const MY_INT = 1;',
   '',
   'const MY_CONST = {',
   '   a: 1,',
   '   b: 2,',
   '   c: 3',
   '};'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

ruleTester.run('no-multiline-var-declaration', rule, {
   valid: [
      {
         code: validExample,
         options: [],
      },
      {
         code: validSingleConst,
         options: [ { 'var': 'never', 'let': 'never', 'const': 'single-only' } ],
      },
   ],

   invalid: [
      {
         code: invalidExample,
         options: [],
         errors: [
            {
               message: 'Variable declaration for myArray should not span multiple lines.',
               type: 'VariableDeclarator',
            },
         ],
      },
      {
         code: invalidExample2,
         options: [],
         errors: [
            {
               message: 'Variable declaration for myObj should not span multiple lines.',
               type: 'VariableDeclarator',
            },
         ],
      },
      {
         code: invalidSingleConst,
         options: [ { 'var': 'never', 'let': 'never', 'const': 'single-only' } ],
         errors: [
            {
               message: 'Variable declaration for MY_CONST should not span multiple lines.',
               type: 'VariableDeclarator',
            },
         ],
      },
      {
         code: invalidSingleConst2,
         options: [ { 'var': 'never', 'let': 'never', 'const': 'single-only' } ],
         errors: [
            {
               message: 'Variable declaration for myLetVar should not span multiple lines.',
               type: 'VariableDeclarator',
            },
         ],
      },
   ],
});
