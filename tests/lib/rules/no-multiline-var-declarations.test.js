/**
* @fileoverview Check that no array or object declarations span multiple lines.
*/
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-multiline-var-declaration'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample, invalidExample2, validExample;

validExample = formatCode(
   'var myArray = [],',
   '    myObj = { a: 1, b: 2 };',
   '',
   'myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

invalidExample = formatCode(
   'var myArray = [',
   '   1,',
   '   2,',
   '   3,',
   '];'
);

invalidExample2 = formatCode(
   'var myArray = [],',
   '    myObj = {',
   '     a: 1,',
   '     b: 2,',
   '     c: 3,',
   '    }'
);

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('no-multiline-var-declaration', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [ {
            message: 'Variable declaration for myArray should not span multiple lines.',
            type: 'VariableDeclarator'
         } ]
      },
      {
         code: invalidExample2,
         errors: [ {
            message: 'Variable declaration for myObj should not span multiple lines.',
            type: 'VariableDeclarator'
         } ]
      },
   ]
});
