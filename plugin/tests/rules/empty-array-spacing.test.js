/**
 * @fileoverview Ensure consistent spacing in empty object declarations
 */

'use strict';

var rule = require('../../rules/empty-array-spacing.js'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    spacedExample, notSpacedExample, shouldBeSkipped;

spacedExample = formatCode('var arr = [ ];');
notSpacedExample = formatCode('var arr = [];');
shouldBeSkipped = formatCode(
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
