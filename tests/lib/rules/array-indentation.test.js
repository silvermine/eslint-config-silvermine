/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/array-indentation'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample, validExample1, validExample2;

invalidExample = formatCode(
   'var a;',
   '',
   'a = [',
   '   3, 4];'
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

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('array-indentation', rule, {
    valid: [
       validExample1,
       validExample2
    ],

    invalid: [
        {
            code: invalidExample,
            errors: [ {
                message: 'Array expressions must begin and end with the same indentation',
                type: 'ArrayExpression'
            } ]
        }
    ]
});
