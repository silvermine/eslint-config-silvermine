/**
 * @fileoverview Ensures consistent spacing in empty array declarations
 */
import type { Rule } from 'eslint';
import type { ArrayExpression, ArrayPattern } from 'estree';

type ArrayNode = ArrayExpression | ArrayPattern;

const rule: Rule.RuleModule = {

   meta: {
      docs: {
         description: 'enforce consistent spacing inside empty array declarations',
         category: 'Stylistic Issues',
      },
      schema: [
         { enum: [ 'always', 'never' ] },
      ],
   },

   create(context) {
      const spaceRequired = context.options[0] === 'always',
            sourceCode = context.sourceCode;

      function validateArray(node: ArrayNode): void {
         // Only check empty array declarations
         if (node.elements.length > 0) {
            return;
         }

         const first = sourceCode.getFirstToken(node);

         if (!first) {
            return;
         }

         // We are already checking that the declaration is empty, so the second Token
         // will be the closing bracket
         const last = sourceCode.getTokenAfter(first);

         if (!last) {
            return;
         }

         const spaced = sourceCode.isSpaceBetweenTokens(first, last);

         if (spaceRequired && !spaced) {
            context.report({
               node,
               message: 'Empty array requires space',
            });
            return;
         }

         if (!spaceRequired && spaced) {
            context.report({
               node,
               message: 'Empty array should not contain whitespace',
            });
         }
      }

      return {
         ArrayPattern: validateArray,
         ArrayExpression: validateArray,
      };
   },

};

export default rule;
