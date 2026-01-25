/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/brace-style.js';
import formatCode from '../code-helper.js';
import { es6 } from '../rule-testers.js';

const ruleTester = es6();

const invalidExamples = [
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

const validExample = formatCode(
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

describe('brace-style', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('brace-style', rule, {
         valid: [
            {
               code: validExample,
               options: [ '1tbs', { allowSingleLine: false, allowSingleLineArrow: true } ],
            },
         ],

         invalid: invalidExamples,
      });
   });
});
