/**
 * @fileoverview Ensures all case statements are block scoped.
 */
import type { Rule } from 'eslint';
import type { SwitchCase } from 'estree';

const rule: Rule.RuleModule = {

   meta: {
      schema: [],
   },

   create(context) {
      return {
         SwitchCase(node: SwitchCase) {
            if (node.consequent.length === 0) {
               return;
            }

            if (node.consequent[0].type !== 'BlockStatement') {
               context.report({
                  node,
                  message: 'Case statements must be block scoped.',
               });
            }
         },
      };
   },

};

export default rule;
