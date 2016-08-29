/**
 * @fileoverview Check that no array or object declarations span multiple lines.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-multiline-conditionals'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    validExample, invalidIf, invalidIfElse, invalidFor, invalidWhile, invalidForIn, invalidDoWhile;

validExample = formatCode(
   'if (a < b) {',
   '   while (a < b) {',
   '      a += 1;',
   '   }',
   '}',
   '',
   'for (var i = 0; i < 4; i++) {',
   '   a += i;',
   '};',
   '',
   'do {',
   '   a += b;',
   '} while (a < 10);',
   '',
   'for (var str in arr) {',
   '   a = a + str;',
   '}'
);

invalidIf = formatCode(
   'if (',
   '   a === b',
   ') {',
   '   b = a -i;',
   '}'
);

invalidIfElse = formatCode(
   'if (a === b) {',
   '   a += a;',
   '} else if (',
   '      b < a',
   '     ) {',
   '  b += 1;',
   '}'
);

invalidWhile = formatCode(
   'while (a < b &&',
   '        c > d) {',
   '   a += c;',
   '}'
);

invalidFor = formatCode(
   'for(',
   '  var i = 0;',
   '  i < 10;',
   '  i++',
   ') {',
   '  a += i;',
   '}'
);

invalidForIn = formatCode(
   'for(',
   'var str',
   'in arr) {',
   '  a = a + str;',
   '}'
);

invalidDoWhile = formatCode(
   'do {',
   '   a += 1;',
   '} while (',
   '      a < 10',
   ');'
);

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('no-multiline-conditionals', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidIf,
         errors: [ {
            message: 'IfStatement should not span multiple lines.',
            type: 'IfStatement'
         } ]
      },
      {
         code: invalidIfElse,
         errors: [ {
            message: 'IfStatement should not span multiple lines.',
            type: 'IfStatement'
         } ]
      },
      {
         code: invalidWhile,
         errors: [ {
            message: 'WhileStatement should not span multiple lines.',
            type: 'WhileStatement'
         } ]
      },
      {
         code: invalidFor,
         errors: [ {
            message: 'ForStatement should not span multiple lines.',
            type: 'ForStatement'
         } ]
      },
      {
         code: invalidDoWhile,
         errors: [ {
            message: 'DoWhileStatement should not span multiple lines.',
            type: 'DoWhileStatement'
         } ]
      },
      {
         code: invalidForIn,
         errors: [ {
            message: 'ForInStatement should not span multiple lines.',
            type: 'ForInStatement'
         } ]
      },
   ]
});
