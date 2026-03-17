/**
 * @fileoverview Ensures all case statements are block scoped.
 */

'use strict';

module.exports = {

   meta: {
      type: 'suggestion',
      schema: [],
   },

   create: function(context) {

      return {
         'SwitchCase': function(node) {
            if (node.consequent.length === 0) {
               return;
            }

            if (node.consequent[0].type !== 'BlockStatement') {
               context.report({
                  node: node,
                  message: 'Case statements must be block scoped.',
               });
            }
         },
      };
   },

};
