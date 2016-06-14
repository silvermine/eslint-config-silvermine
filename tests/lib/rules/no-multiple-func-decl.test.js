/**
 * @fileoverview Enforce spacing for chained calls
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var noMultipleFunctionDeclaration = require('../../../lib/rules/no-multiple-inline-functions'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample,
    validExample;

invalidExample = formatCode(
   'promise.then(function(val) {',
   '   console.log(val);',
   '}, function(err) {',
   '   console.log(err);',
   '});'
);

validExample = formatCode(
   'var onFulfill, onReject;',
   '',
   'onFulfill = function(val) {',
      'console.log(val);',
   '};',
   '',
   'onReject = function(err) {',
      'console.log(err);',
   '};',
   '',
   'promise.then(onFulfill, onReject);'
);

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------


ruleTester.run('no-multiple-inline-functions', noMultipleFunctionDeclaration, {
   valid: [
      validExample
   ],
   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'Too many function declarations used as arguments',
               type: 'FunctionExpression'
            }
         ]
      }
   ]
});
