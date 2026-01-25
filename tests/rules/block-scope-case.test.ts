/**
* @fileoverview Check that all case statements are block scoped.
*/
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/block-scope-case.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const validExample1 = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

const validExample2 = formatCode(
   'switch (x) {',
   '   case 1:',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

const invalidExample1 = formatCode(
   'switch (x) {',
   '   case 2: ',
   '      doSomethingWith2(x);',
   '      break;',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);

const invalidExample2 = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);

const invalidExample3 = formatCode(
   'switch (x) {',
   '   case 1:',
   '   case 2: ',
   '      doSomethingWith2(x);',
   '      break;',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

describe('block-scope-case', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('block-scope-case', rule, {
         valid: [
            validExample1,
            validExample2,
         ],

         invalid: [
            {
               code: invalidExample1,
               errors: [
                  {
                     message: 'Case statements must be block scoped.',
                     type: 'SwitchCase',
                  },
                  {
                     message: 'Case statements must be block scoped.',
                     type: 'SwitchCase',
                  },
               ],
            },
            {
               code: invalidExample2,
               errors: [
                  {
                     message: 'Case statements must be block scoped.',
                     type: 'SwitchCase',
                  },
               ],
            },
            {
               code: invalidExample3,
               errors: [
                  {
                     message: 'Case statements must be block scoped.',
                     type: 'SwitchCase',
                  },
               ],
            },
         ],
      });
   });
});
