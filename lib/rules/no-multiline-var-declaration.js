/**
 * @fileoverview Ensures that array and object instatiations do not span multiple lines
 */

'use strict';

module.exports = {

   create: function(context) {

      function validateVar(node) {
         if (node.loc.start.line !== node.loc.end.line) {
            context.report({
               node: node,
               message: 'Variable declaration for {{ identifier }} should not span multiple lines.',
               data: {
                  identifier: node.id.name,
               },
            });
         }
      }

      return {
         'VariableDeclarator': validateVar,
      };
   },

};
