/**
 * @fileoverview Multiple function declarations in a call expression should not be allowed
 */
import type { Rule } from 'eslint';
import type { CallExpression } from 'estree';

const rule: Rule.RuleModule = {

   meta: {
      type: 'problem',
      schema: [],
   },

   create(context) {
      function checkCallExpression(node: CallExpression): void {
         let hasFunctionArgument = false;

         node.arguments.forEach((argument) => {
            if (argument.type === 'FunctionExpression') {
               if (hasFunctionArgument) {
                  context.report({
                     node: argument,
                     message: 'Too many function declarations used as arguments',
                  });
               }
               hasFunctionArgument = true;
            }
         });
      }

      return {
         CallExpression: checkCallExpression,
      };
   },

};

export default rule;
