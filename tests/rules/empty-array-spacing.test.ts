/**
 * @fileoverview Ensure consistent spacing in empty object declarations
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/empty-array-spacing.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const spacedExample = formatCode('var arr = [ ];');

const notSpacedExample = formatCode('var arr = [];');

const shouldBeSkipped = formatCode(
   'var arr = [1,2,3],',
   '    arr2 = [ 1,2,3],',
   '    arr3 = [1,2,3 ],',
   '    arr4 = [ 1,2,3, ],',
   '    arr5 = [ 1, 2, 3, ];',
   'arr[1] = 1;',
   'arr[ 1 ] = 2;',
   'arr[1 ] = 2;',
   'arr[ 1] = 3;'
);

describe('empty-array-spacing', () => {
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
                     message: 'Empty array should not contain whitespace',
                     type: 'ArrayExpression',
                  },
               ],
            },
            {
               code: notSpacedExample,
               options: [ 'always' ],
               errors: [
                  {
                     message: 'Empty array requires space',
                     type: 'ArrayExpression',
                  },
               ],
            },
         ],
      });
   });
});
