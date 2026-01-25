/**
 * @fileoverview Enforce spacing for chained calls
 */
import { describe, it } from 'vitest';
import noMultipleFunctionDeclaration from '../../src/plugin/rules/no-multiple-inline-functions.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const invalidExample = formatCode(
   'promise.then(function(val) {',
   '   console.log(val);',
   '}, function(err) {',
   '   console.log(err);',
   '});'
);

const validExample = formatCode(
   'var onFulfill, onReject;',
   '',
   'onFulfill = function(val) {',
   '   console.log(val);',
   '};',
   '',
   'onReject = function(err) {',
   '   console.log(err);',
   '};',
   '',
   'promise.then(onFulfill, onReject);'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('no-multiple-inline-functions', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('no-multiple-inline-functions', noMultipleFunctionDeclaration, {
         valid: [
            validExample,
         ],
         invalid: [
            {
               code: invalidExample,
               errors: [
                  {
                     message: 'Too many function declarations used as arguments',
                     type: 'FunctionExpression',
                  },
               ],
            },
         ],
      });
   });
});
