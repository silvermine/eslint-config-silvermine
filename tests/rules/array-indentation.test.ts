/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/array-indentation.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const invalidExample = formatCode(
   'var a, b, c;',
   '',
   'a = [',
   '   3, 4];',
   'b = [ 3,',
   '   4,',
   '];',
   'c = [',
   '   3,',
   '4,];'
);

const validExample1 = formatCode(
   'var a;',
   '',
   'a = [',
   '  3, 4',
   '];'
);

const validExample2 = formatCode(
   'var a;',
   '',
   'a = [',
   '   3,',
   '   4',
   '];'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('array-indentation', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('array-indentation', rule, {
         valid: [
            validExample1,
            validExample2,
         ],

         invalid: [
            {
               code: invalidExample,
               errors: [
                  {
                     message: 'Array expressions must begin and end with the same indentation',
                     type: 'ArrayExpression',
                  },
                  {
                     message: 'The closing parenthesis in multiline array expressions must be on a new line',
                     type: 'ArrayExpression',
                  },
                  {
                     message: 'The first element in multiline array expressions must be on a new line',
                     type: 'ArrayExpression',
                  },
                  {
                     message: 'The closing parenthesis in multiline array expressions must be on a new line',
                     type: 'ArrayExpression',
                  },
               ],
            },
         ],
      });
   });
});
