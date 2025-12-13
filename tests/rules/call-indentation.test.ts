/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/call-indentation.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const MSG_ARG_ON_NEW_LINE = 'When arguments are on their own line, they must all be on their own line',
      MSG_PAREN_ON_NEW_LINE = 'Closing parenthesis should be on a new line',
      MSG_CALL_SAME_INDENT = 'Call expressions must begin and end with the same indentation',
      MSG_ARG_ON_SAME_LINE = 'Argument should start on the ending line of previous argument',
      MSG_PAREN_ON_SAME_LINE = 'Closing parenthesis should be on same line as last argument',
      MSG_MULTIPLE_MULTILINE_ARGS = 'Only one multiline argument allowed';

const invalidExamples = [
   {
      code: formatCode(
         'Process(function() {',
         '      return;',
         '   });'
      ),
      errors: [
         {
            message: MSG_CALL_SAME_INDENT,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(arg1, arg2,',
         '   arg3',
         ');'
      ),
      errors: [
         {
            message: MSG_ARG_ON_SAME_LINE,
            type: 'Identifier',
         },
         {
            message: MSG_PAREN_ON_SAME_LINE,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(',
         '   arg1,',
         '    arg2,',
         '   arg3',
         ');'
      ),
      errors: [
         {
            message: 'Expected indent of 3, found indent of 4',
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(',
         '   arg1,',
         '   arg3);'
      ),
      errors: [
         {
            message: MSG_CALL_SAME_INDENT,
            type: 'CallExpression',
         },
         {
            message: MSG_PAREN_ON_NEW_LINE,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(',
         '   arg1, arg2,',
         '   arg3',
         ');'
      ),
      errors: [
         {
            message: MSG_ARG_ON_NEW_LINE,
            type: 'CallExpression',
         },
         {
            message: MSG_ARG_ON_NEW_LINE,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(',
         'arg1,',
         'arg3',
         ');'
      ),
      errors: [
         {
            message: 'Expected indent of 3, found indent of 0',
            type: 'CallExpression',
         },
         {
            message: 'Expected indent of 3, found indent of 0',
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(arg1, arg2,',
         'function() {',
         '   something();',
         '});'
      ),
      errors: [
         {
            message: MSG_ARG_ON_SAME_LINE,
            type: 'FunctionExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(arg1, function() {',
         '   something();',
         '}',
         ');'
      ),
      errors: [
         {
            message: MSG_PAREN_ON_SAME_LINE,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(',
         '   a, d);'
      ),
      errors: [
         {
            message: MSG_CALL_SAME_INDENT,
            type: 'CallExpression',
         },
         {
            message: MSG_ARG_ON_NEW_LINE,
            type: 'CallExpression',
         },
         {
            message: MSG_ARG_ON_NEW_LINE,
            type: 'CallExpression',
         },
         {
            message: MSG_PAREN_ON_NEW_LINE,
            type: 'CallExpression',
         },
      ],
   },
   {
      code: formatCode(
         'fn(function() {',
         '   callback1();',
         '}, function() {',
         '   callback2();',
         '});',
         'promise.then(',
         '   function() {',
         '      yayItWorked()',
         '   },',
         '   function(err) {',
         '      ohNoSomethingWentWrong(err);',
         '   }',
         ');'
      ),
      errors: [
         {
            message: MSG_MULTIPLE_MULTILINE_ARGS,
            type: 'CallExpression',
         },
         {
            message: MSG_MULTIPLE_MULTILINE_ARGS,
            type: 'CallExpression',
         },
      ],
   },
];

const validExample = formatCode(
   'Process(function() {',
   '   return;',
   '});',
   'promise',
   '   .then(function(var1) {',
   '      something()',
   '      return;',
   '   });',
   'fn(arg1, arg2, function() {',
   '   something();',
   '});',
   'fn(',
   '   arg1,',
   '   arg2',
   ');',
   '_.reduce(list, function(memo, item) {',
   '   return memo + item;',
   '}, 0);',
   '_.reduce(',
   '   list,',
   '   function(memo, item) {',
   '      return memo + item;',
   '   },',
   '   0',
   ');',
   'fn(',
   '   arg1,',
   '   arg2,',
   '   function() {',
   '      something();',
   '   }',
   ');'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('call-indentation', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('call-indentation', rule, {
         valid: [
            validExample,
         ],

         invalid: invalidExamples,
      });
   });
});
