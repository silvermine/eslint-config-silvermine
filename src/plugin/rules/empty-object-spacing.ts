/**
 * @fileoverview Ensures consistent spacing in empty object declarations
 */
import type { Rule } from 'eslint';
import type { ObjectExpression, ObjectPattern } from 'estree';

type ObjectNode = ObjectExpression | ObjectPattern;

const rule: Rule.RuleModule = {

   meta: {
      docs: {
         description: 'enforce consistent spacing inside empty object declarations',
         category: 'Stylistic Issues',
      },
      schema: [
         { enum: [ 'always', 'never' ] },
      ],
   },

   create(context) {
      const spaceRequired = context.options[0] === 'always',
            sourceCode = context.sourceCode;

      function validateObj(node: ObjectNode): void {
         // Only check empty object declarations
         if (node.properties.length > 0) {
            return;
         }

         const first = sourceCode.getFirstToken(node);

         if (!first) {
            return;
         }

         // We are already checking that the declaration is empty, so the second Token
         // will be the closing brace
         const last = sourceCode.getTokenAfter(first);

         if (!last) {
            return;
         }

         const spaced = sourceCode.isSpaceBetweenTokens(first, last);

         if (spaceRequired && !spaced) {
            context.report({
               node,
               message: 'Empty object requires space',
            });
            return;
         }

         if (!spaceRequired && spaced) {
            context.report({
               node,
               message: 'Empty object should not contain whitespace',
            });
         }
      }

      return {
         ObjectPattern: validateObj,
         ObjectExpression: validateObj,
      };
   },

};

export default rule;
