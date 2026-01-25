/**
 * @fileoverview Check that no array or object declarations span multiple lines.
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/no-multiline-conditionals.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const validExample = formatCode(
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
   '}',
   '',
   'for (var i = 0; i < 3;) {',
   '  i += 2;',
   '}',
   'for (;i < 2; i++) {',
   '  a = i;',
   '}',
   'for (;i < 3;) {',
   '  i++;',
   '}'
);

const invalidIf = formatCode(
   'if (',
   '   a === b',
   ') {',
   '   b = a -i;',
   '}'
);

const invalidIfElse = formatCode(
   'if (a === b) {',
   '   a += a;',
   '} else if (',
   '      b < a',
   '     ) {',
   '  b += 1;',
   '}'
);

const invalidWhile = formatCode(
   'while (a < b &&',
   '        c > d) {',
   '   a += c;',
   '}'
);

const invalidFor = formatCode(
   'for(',
   '  var i = 0;',
   '  i < 10;',
   '  i++',
   ') {',
   '  a += i;',
   '}'
);

const invalidForIn = formatCode(
   'for(',
   'var str',
   'in arr) {',
   '  a = a + str;',
   '}'
);

const invalidDoWhile = formatCode(
   'do {',
   '   a += 1;',
   '} while (',
   '      a < 10',
   ');'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('no-multiline-conditionals', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('no-multiline-conditionals', rule, {
         valid: [
            validExample,
         ],

         invalid: [
            {
               code: invalidIf,
               errors: [
                  {
                     message: 'IfStatement should not span multiple lines.',
                     type: 'IfStatement',
                  },
               ],
            },
            {
               code: invalidIfElse,
               errors: [
                  {
                     message: 'IfStatement should not span multiple lines.',
                     type: 'IfStatement',
                  },
               ],
            },
            {
               code: invalidWhile,
               errors: [
                  {
                     message: 'WhileStatement should not span multiple lines.',
                     type: 'WhileStatement',
                  },
               ],
            },
            {
               code: invalidFor,
               errors: [
                  {
                     message: 'ForStatement should not span multiple lines.',
                     type: 'ForStatement',
                  },
               ],
            },
            {
               code: invalidDoWhile,
               errors: [
                  {
                     message: 'DoWhileStatement should not span multiple lines.',
                     type: 'DoWhileStatement',
                  },
               ],
            },
            {
               code: invalidForIn,
               errors: [
                  {
                     message: 'ForInStatement should not span multiple lines.',
                     type: 'ForInStatement',
                  },
               ],
            },
         ],
      });
   });
});
