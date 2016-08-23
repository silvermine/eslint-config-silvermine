/**
* @fileoverview Check indentation at the beginning and end of a function call
*/
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/indent'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    validExample, switchTest, constExample,
    invalidExample, invalidExample2, invalidExample3, constInvalid;

validExample = formatCode(
   'var a = 1,',
   '    b = 2,',
   '    c = 3;',
   '',
   'function test() {',
   '   a()',
   '      .b(function() {',
   '         var a = 1,',
   '             b = 2;',
   '',
   '         return a()',
   '            .b(function() {});',
   '      });',
   '}',
   '',
   'function test2() {',
   '   var arr = [ 1, 2, 3 ],',
   '       noInit, andAgain;',
   '',
   '   if (noInit) {',
   '      var a = 1,',
   '          b = 2;',
   '   }',
   '}'
);

invalidExample = formatCode(
   'function test() {',
   '   var a = 1,',
   '      b = 2;',
   '',
   '   return a + b;',
   '}'
);

invalidExample2 = formatCode(
   'var a = 1,',
   '    b = 2;',
   '',
   'function badIndent() {',
   '  a = b;',
   '}'
);

invalidExample3 = formatCode(
   'function test() {',
   'notindented();',
   '}'
);

switchTest = formatCode(
   'switch (a) {',
   '   case 1:',
   '      break;',
   '   default:',
   '      c = a + b',
   '}'
);

constExample = formatCode(
   'const A = 1,',
   '      B = 2;'
);

constInvalid = formatCode(
   'const A = 1,',
   '   B = 2;',
   '',
   'const C = 3,',
   '    D = 4;'
);

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('indent', rule, {
   valid: [
      {
         code: validExample,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: switchTest,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: constExample,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
         parserOptions: { ecmaVersion: 6 },
      },
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'Expected indentation of 7 space characters but found 6.',
               type: 'VariableDeclarator',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: invalidExample2,
         errors: [
            {
               message: 'Expected indentation of 3 space characters but found 2.',
               type: 'ExpressionStatement',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: invalidExample3,
         errors: [
            {
               message: 'Expected indentation of 3 space characters but found 0.',
               type: 'ExpressionStatement',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: switchTest,
         errors: [
            {
               message: 'Expected indentation of 0 space characters but found 3.',
               type: 'SwitchCase',
            },
            {
               message: 'Expected indentation of 3 space characters but found 6.',
               type: 'BreakStatement',
            },
            {
               message: 'Expected indentation of 0 space characters but found 3.',
               type: 'SwitchCase',
            },
            {
               message: 'Expected indentation of 3 space characters but found 6.',
               type: 'ExpressionStatement',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 } } ],
      },
      {
         code: constInvalid,
         errors: [
            {
               message: 'Expected indentation of 6 space characters but found 3.',
               type: 'VariableDeclarator',
            },
            {
               message: 'Expected indentation of 6 space characters but found 4.',
               type: 'VariableDeclarator',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
         parserOptions: { ecmaVersion: 6 },
      },
   ],
});
