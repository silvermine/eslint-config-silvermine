/**
 * @fileoverview Ensures all case statements are block scoped.
 */

'use strict';

var { isEmpty } = require('@silvermine/toolbox');

module.exports = {

   meta: {
      type: 'suggestion',
      schema: [],
   },

   create: function(context) {

      return {
         'SwitchCase': function(node) {
            if (isEmpty(node.consequent)) {
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
