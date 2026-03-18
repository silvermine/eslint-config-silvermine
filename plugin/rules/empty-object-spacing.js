/**
 * @fileoverview Ensures consistent spacing in empty object declarations
 */

'use strict';

module.exports = {

   meta: {
      docs: {
         description: 'enforce consistent spacing inside empty object declarations',
         category: 'Stylistic Issues',
      },

      schema: [
         { 'enum': [ 'always', 'never' ] },
      ],
   },

   create: function(context) {
      var spaceRequired = context.options[0] === 'always',
          sourceCode = context.sourceCode;

      function validateObj(node) {
         var first, last, spaced;

         // Only check empty object declarations
         if (node.properties.length > 0) {
            return;
         }

         first = sourceCode.getFirstToken(node);
         // We are already checking that the declaration is empty, so the second Token
         // will be the closing brace
         last = sourceCode.getTokenAfter(first);

         spaced = sourceCode.isSpaceBetweenTokens(first, last);

         if (spaceRequired && !spaced) {
            context.report({
               node: node,
               message: 'Empty object requires space',
            });
            return;
         }

         if (!spaceRequired && spaced) {
            context.report({
               node: node,
               message: 'Empty object should not contain whitespace',
            });
            return;
         }
      }

      return {
         'ObjectPattern': validateObj,
         'ObjectExpression': validateObj,
      };
   },

};
