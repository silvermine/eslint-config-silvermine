/**
 * @fileoverview Ensures that arrow functions are not used for class properties
 */
import type { Rule } from 'eslint';
import type { PropertyDefinition } from 'estree';

const rule: Rule.RuleModule = {

   meta: {
      schema: [],
   },

   create(context) {
      return {
         PropertyDefinition(node: PropertyDefinition) {
            if (node.value && node.value.type === 'ArrowFunctionExpression') {
               context.report({
                  node,
                  message: 'Arrow functions should not be used for class properties.',
               });
            }
         },
      };
   },

};

export default rule;
