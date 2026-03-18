/**
 * @fileoverview Ensure consistent spacing in empty object declarations
 */

'use strict';

var rule = require('../../rules/empty-object-spacing.js'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    spacedExample, notSpacedExample, shouldBeSkipped;

spacedExample = formatCode('var obj = { };');
notSpacedExample = formatCode('var obj = {};');
shouldBeSkipped = formatCode(
   'var obj = { a: 1 };',
   '    obj = {a: 1},',
   '    obj2 = {b: 1 },',
   '    obj3 = { c: 1};'
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
