/**
* @fileoverview Check that no array or object declarations span multiple lines.
*/
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/no-multiline-var-declaration.js';
import formatCode from '../code-helper.js';
import { es6 } from '../rule-testers.js';

const ruleTester = es6();

const validExample = formatCode(
   'var myArray = [],',
   '    myObj = { a: 1, b: 2 };',
   '',
   'myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

const invalidExample = formatCode(
   'var myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

const invalidExample2 = formatCode(
   'var myArray = [],',
   '    myObj = {',
   '     a: 1,',
   '     b: 2,',
   '     c: 3,',
   '    }'
);

const validSingleConst = formatCode(
   'const MY_INT = 1;',
   '',
   'const MY_CONST = {',
   '   a: 1,',
   '   b: 2,',
   '   c: 3',
   '};'
);

const invalidSingleConst = formatCode(
   'const MY_INT = 1,',
   '      MY_CONST = {',
   '         a: 1,',
   '         b: 2,',
   '         c: 3',
   '      };'
);

const invalidSingleConst2 = formatCode(
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

describe('no-multiline-var-declaration', () => {
   it('should pass RuleTester tests', () => {
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
   });
});
