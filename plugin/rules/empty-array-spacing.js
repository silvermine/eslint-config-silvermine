/**
 * @fileoverview Ensures consistent spacing in empty array declarations
 */

'use strict';

module.exports = {

   meta: {
      docs: {
         description: 'enforce consistent spacing inside empty array declarations',
         category: 'Stylistic Issues',
      },

      schema: [
         { 'enum': [ 'always', 'never' ] },
      ],
   },

   create: function(context) {
      var spaceRequired = context.options[0] === 'always',
          sourceCode = context.sourceCode;

      function validateArray(node) {
         var first, last, spaced;

         // Only check empty array declarations
         if (node.elements.length > 0) {
            return;
         }

         first = sourceCode.getFirstToken(node);
         // We are already checking that the declaration is empty, so the second Token
         // will be the closing bracket
         last = sourceCode.getTokenAfter(first);

         spaced = sourceCode.isSpaceBetweenTokens(first, last);

         if (spaceRequired && !spaced) {
            context.report({
               node: node,
               message: 'Empty array requires space',
            });
            return;
         }

         if (!spaceRequired && spaced) {
            context.report({
               node: node,
               message: 'Empty array should not contain whitespace',
            });
            return;
         }
      }

      return {
         'ArrayPattern': validateArray,
         'ArrayExpression': validateArray,
      };
   },

};
