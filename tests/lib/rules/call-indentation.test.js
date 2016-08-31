/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/call-indentation'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample, validExample;

invalidExample = formatCode(
   'Process(function() {',
   '      return;',
   '   });'
);

validExample = formatCode(
   'Process(function() {',
   '   return;',
   '});'
);

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('call-indentation', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [ {
            message: 'Call expressions must begin and end with the same indentation',
            type: 'CallExpression'
         } ],
      },
   ],
});
