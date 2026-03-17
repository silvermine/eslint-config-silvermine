/**
 * @fileoverview Ensures that arrow functions are not used for class properties
 */

'use strict';

module.exports = {

   meta: {
      type: 'problem',
      schema: [],
   },

   create: function(context) {
      return {
         PropertyDefinition: function(node) {
            if (node.value.type === 'ArrowFunctionExpression') {
               context.report({
                  node: node,
                  message: 'Arrow functions should not be used for class properties.',
               });
            }
         },
      };
   },

};
