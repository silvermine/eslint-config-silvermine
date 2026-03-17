/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../rules/array-indentation'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample, validExample1, validExample2;

invalidExample = formatCode(
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

validExample1 = formatCode(
   'var a;',
   '',
   'a = [',
   '  3, 4',
   '];'
);

validExample2 = formatCode(
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
