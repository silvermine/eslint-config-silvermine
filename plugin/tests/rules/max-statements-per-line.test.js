/**
 * @fileoverview Check maximum statelemtns on a single line
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../rules/max-statements-per-line'),
    formatCode = require('../code-helper'),
    ruleTester = require('../ruleTesters').es6(),
    invalidExamples, validExample, validExampleMax2;

invalidExamples = [
   {
      code: formatCode(
         'x = 4; y = 2;',
         'x = 3 + 1; y = x;',
         'let x = 1; let y = 2;',
         'var foo = function foo() { var bar = 1; };',
         'if (condition) { var bar = 1; var baz = 2; }',
         'function foo() {',
         '   let x = 1; return x;',
         '}',
         'myArray.forEach((x) => { y = y + x; z = y * x });'
      ),
      errors: [
         {
            message: 'This line has 2 statements. Maximum allowed is 1.',
            type: 'ExpressionStatement',
         },
         {
            message: 'This line has 2 statements. Maximum allowed is 1.',
            type: 'ExpressionStatement',
         },
         {
            message: 'This line has 2 statements. Maximum allowed is 1.',
            type: 'VariableDeclaration',
         },
         {
            message: 'This line has 2 statements. Maximum allowed is 1.',
            type: 'VariableDeclaration',
         },
         {
            message: 'This line has 3 statements. Maximum allowed is 1.',
            type: 'VariableDeclaration',
         },
         {
            message: 'This line has 2 statements. Maximum allowed is 1.',
            type: 'ReturnStatement',
         },
         {
            message: 'This line has 3 statements. Maximum allowed is 1.',
            type: 'ExpressionStatement',
         },
      ],
      options: [ { 'max': 1 } ],
   },
];

validExample = formatCode(
   'if (condition) var bar = 1;',
   'let z = 1',
   'for (let i = 1; i < 1000; i++) {',
   '   console.log(i);',
   '}',
   'myArray.forEach((x) => { y = y + x });',
   'myArray.forEach((x) => y = y + x);'
);

validExampleMax2 = formatCode(
   'let a = 1; let b = 2;',
   'function foo() {',
   '   let y = 1; return y;',
   '}'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

ruleTester.run('max-statements-per-line', rule, {
   valid: [
      {
         code: validExample,
         options: [ { 'max': 1 } ],
      },
      {
         code: validExampleMax2,
         options: [ { 'max': 2 } ],
      },
   ],

   invalid: invalidExamples,
});
