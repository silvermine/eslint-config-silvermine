/**
 * @fileoverview Ensure consistent spacing in empty object declarations
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/empty-object-spacing.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const spacedExample = formatCode('var obj = { };');

const notSpacedExample = formatCode('var obj = {};');

const shouldBeSkipped = formatCode(
   'var obj = { a: 1 };',
   '    obj = {a: 1},',
   '    obj2 = {b: 1 },',
   '    obj3 = { c: 1};'
);

describe('empty-object-spacing', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('empty-object-spacing', rule, {
         valid: [
            {
               code: spacedExample,
               options: [ 'always' ],
            },
            {
               code: notSpacedExample,
               options: [ 'never' ],
            },
            {
               code: shouldBeSkipped,
               options: [ 'always' ],
            },
            {
               code: shouldBeSkipped,
               options: [ 'never' ],
            },
         ],


         invalid: [
            {
               code: spacedExample,
               options: [ 'never' ],
               errors: [
                  {
                     message: 'Empty object should not contain whitespace',
                     type: 'ObjectExpression',
                  },
               ],
            },
            {
               code: notSpacedExample,
               options: [ 'always' ],
               errors: [
                  {
                     message: 'Empty object requires space',
                     type: 'ObjectExpression',
                  },
               ],
            },
         ],
      });
   });
});
