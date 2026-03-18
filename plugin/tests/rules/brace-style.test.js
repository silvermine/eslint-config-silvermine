/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../rules/brace-style'),
    formatCode = require('../code-helper'),
    ruleTester = require('../ruleTesters').es6(),
    invalidExamples, validExample;

invalidExamples = [
   {
      code: formatCode(
         'if (a === b) { doSomething() }',
         'if (a === b) {',
         ' doSomething(); }',
         'if (a === b )',
         '{',
         '   doSomething();',
         '}',
         'let badArrow = (b) => ',
         '{',
         '  doSomething(b);',
         '};'
      ),
      output: formatCode(
         'if (a === b) {',
         ' doSomething() ',
         '}',
         'if (a === b) {',
         ' doSomething(); ',
         '}',
         'if (a === b ) {',
         '   doSomething();',
         '}',
         'let badArrow = (b) => {',
         '  doSomething(b);',
         '};'
      ),
      errors: [
         {
            message: 'Statement inside of curly braces should be on next line.',
            type: 'Punctuator',
         },
         {
            message: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
            type: 'Punctuator',
         },
         {
            message: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
            type: 'Punctuator',
         },
         {
            message: 'Opening curly brace does not appear on the same line as controlling statement.',
            type: 'Punctuator',
         },
         {
            message: 'Opening curly brace does not appear on the same line as controlling statement.',
            type: 'Punctuator',
         },
      ],
      options: [ '1tbs', { allowSingleLine: false, allowSingleLineArrow: true } ],
   },
];

validExample = formatCode(
   'if (a === b) {',
   '   doSomething();',
   '}',
   'if (a === b) {',
   '   doSomething();',
   '} else {',
   '   doSomethingElse();',
   '}',
   'while (a === b) {',
   '   doSomething();',
   '}',
   'function myFunc(a) {',
   '   doSomething(a);',
   '}',
   'let func = (a) => {',
   '   doSomething(a);',
   '};',
   'try {',
   '   doSomething(a);',
   '} catch(e) {',
   '   console.log(e);',
   '}',
   'myOtherFunc((a) => { doSomething(); });',
   'let func2 = (b) => { doSomething(); };'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

ruleTester.run('brace-style', rule, {
   valid: [
      {
         code: validExample,
         options: [ '1tbs', { allowSingleLine: false, allowSingleLineArrow: true } ],
      },
   ],

   invalid: invalidExamples,
});
