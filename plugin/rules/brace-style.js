/**
 * Forked from https://github.com/eslint/eslint/blob/v5.11.1/lib/rules/brace-style.js
 * With the following changes applied: https://github.com/eslint/eslint/compare/bf5bfa5..9738f8c
 * This modification adds the ability to allow single line, block style arrow functions.
 * For example:
 *
 * let func1 = (a) => { doSomething(a); };
 *
 * While it was possible to allow the above by setting "allowSingleLine" to true, this
 * would also allow single line if statements, for loops, try/catch blocks, etc. That
 * was not desired.
 *
 * A new option was added named 'allowSingleLineArrow' which will allow single line,
 * block style arrow functions without allowing other single line block statements.
 *
 * Example configuration:
 *
 * "@silvermine/silvermine/indent": [ "error", "1tbs", { "allowSingleLineArrow": true } ]
 */

'use strict';

const astUtils = require('../helpers/ast-utils');

module.exports = {
   meta: {
      type: 'layout',

      docs: {
         description: 'enforce consistent brace style for blocks',
         category: 'Stylistic Issues',
         recommended: false,
         url: 'https://eslint.org/docs/rules/brace-style',
      },

      schema: [
         {
            'enum': [ '1tbs', 'stroustrup', 'allman' ],
         },
         {
            type: 'object',
            properties: {
               allowSingleLine: {
                  type: 'boolean',
                  default: false,
               },
               allowSingleLineArrow: {
                  type: 'boolean',
                  default: false,
               },
            },
            additionalProperties: false,
         },
      ],

      fixable: 'whitespace',

      messages: {
         nextLineOpen: 'Opening curly brace does not appear on the same line as controlling statement.',
         sameLineOpen: 'Opening curly brace appears on the same line as controlling statement.',
         blockSameLine: 'Statement inside of curly braces should be on next line.',
         nextLineClose: 'Closing curly brace does not appear on the same line as the subsequent block.',
         singleLineClose: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
         sameLineClose: 'Closing curly brace appears on the same line as the subsequent block.',
      },
   },

   create(context) {
      const style = context.options[0] || '1tbs',
            params = context.options[1] || {},
            sourceCode = context.sourceCode;

      // --------------------------------------------------------------------------
      // Helpers
      // --------------------------------------------------------------------------

      /**
       * Fixes a place where a newline unexpectedly appears
       * @param {Token} firstToken The token before the unexpected newline
       * @param {Token} secondToken The token after the unexpected newline
       * @returns {Function} A fixer function to remove the newlines between the tokens
       */
      function removeNewlineBetween(firstToken, secondToken) {
         const textRange = [ firstToken.range[1], secondToken.range[0] ],
               textBetween = sourceCode.text.slice(textRange[0], textRange[1]);

         // Don't do a fix if there is a comment between the tokens
         if (textBetween.trim()) {
            return null;
         }
         return (fixer) => { return fixer.replaceTextRange(textRange, ' '); };
      }

      /**
       * Validates a pair of curly brackets based on the user's config
       * @param {Token} openingCurly The opening curly bracket
       * @param {Token} closingCurly The closing curly bracket
       * @returns {void}
       */
      function validateCurlyPair(openingCurly, closingCurly) {
         const tokenBeforeOpeningCurly = sourceCode.getTokenBefore(openingCurly),
               tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurly),
               tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurly),
               singleLineException = params.allowSingleLine && astUtils.isTokenOnSameLine(openingCurly, closingCurly),
               isOpeningCurlyOnSameLine = astUtils.isTokenOnSameLine(openingCurly, tokenAfterOpeningCurly),
               isClosingCurlyOnSameLine = astUtils.isTokenOnSameLine(tokenBeforeClosingCurly, closingCurly);

         if (style !== 'allman' && !astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly)) {
            context.report({
               node: openingCurly,
               messageId: 'nextLineOpen',
               fix: removeNewlineBetween(tokenBeforeOpeningCurly, openingCurly),
            });
         }

         if (style === 'allman' && astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly) && !singleLineException) {
            context.report({
               node: openingCurly,
               messageId: 'sameLineOpen',
               fix: (fixer) => { return fixer.insertTextBefore(openingCurly, '\n'); },
            });
         }


         if (isOpeningCurlyOnSameLine && tokenAfterOpeningCurly !== closingCurly && !singleLineException) {
            context.report({
               node: openingCurly,
               messageId: 'blockSameLine',
               fix: (fixer) => { return fixer.insertTextAfter(openingCurly, '\n'); },
            });
         }

         if (tokenBeforeClosingCurly !== openingCurly && !singleLineException && isClosingCurlyOnSameLine) {
            context.report({
               node: closingCurly,
               messageId: 'singleLineClose',
               fix: (fixer) => { return fixer.insertTextBefore(closingCurly, '\n'); },
            });
         }
      }

      /**
       * Validates the location of a token that appears before a keyword (e.g. a newline
       * before `else`)
       * @param {Token} curlyToken The closing curly token. This is assumed to precede a
       *    keyword token (such as `else` or `finally`).
       * @returns {void}
       */
      function validateCurlyBeforeKeyword(curlyToken) {
         const keywordToken = sourceCode.getTokenAfter(curlyToken);

         if (style === '1tbs' && !astUtils.isTokenOnSameLine(curlyToken, keywordToken)) {
            context.report({
               node: curlyToken,
               messageId: 'nextLineClose',
               fix: removeNewlineBetween(curlyToken, keywordToken),
            });
         }

         if (style !== '1tbs' && astUtils.isTokenOnSameLine(curlyToken, keywordToken)) {
            context.report({
               node: curlyToken,
               messageId: 'sameLineClose',
               fix: (fixer) => { return fixer.insertTextAfter(curlyToken, '\n'); },
            });
         }
      }

      return {
         BlockStatement(node) {
            const isOneLine = astUtils.isTokenOnSameLine(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));

            if (params.allowSingleLineArrow && node.parent.type === 'ArrowFunctionExpression' && isOneLine) {
               return;
            }

            if (!astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type)) {
               validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
            }
         },
         ClassBody(node) {
            validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
         },
         SwitchStatement(node) {
            const closingCurly = sourceCode.getLastToken(node),
                  openingCurly = sourceCode.getTokenBefore(node.cases.length ? node.cases[0] : closingCurly);

            validateCurlyPair(openingCurly, closingCurly);
         },
         IfStatement(node) {
            if (node.consequent.type === 'BlockStatement' && node.alternate) {

               // Handle the keyword after the `if` block (before `else`)
               validateCurlyBeforeKeyword(sourceCode.getLastToken(node.consequent));
            }
         },
         TryStatement(node) {

            // Handle the keyword after the `try` block (before `catch` or `finally`)
            validateCurlyBeforeKeyword(sourceCode.getLastToken(node.block));

            if (node.handler && node.finalizer) {

               // Handle the keyword after the `catch` block (before `finally`)
               validateCurlyBeforeKeyword(sourceCode.getLastToken(node.handler.body));
            }
         },
      };
   },
};
