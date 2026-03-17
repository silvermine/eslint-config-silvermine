/**
 * @fileoverview Ensures uninitialized variables come last in the variable declaration
 * chain
 */

'use strict';

module.exports = {

   meta: {
      type: 'suggestion',
      schema: [],
   },

   create: function(context) {

      function validateVar(node) {
         var initialized, uninitialized, firstUninitialized, lastInitialized;

         if (node.declarations && node.declarations.length > 1) {
            initialized = node.declarations.filter(function(decl) {
               return decl.init !== null;
            });

            uninitialized = node.declarations.filter(function(decl) {
               return decl.init === null;
            });

            if (initialized.length > 0 && uninitialized.length > 0) {
               lastInitialized = node.declarations.indexOf(initialized[initialized.length - 1]);
               firstUninitialized = node.declarations.indexOf(uninitialized[0]);

               if (firstUninitialized < lastInitialized) {
                  context.report({
                     node: node,
                     message: 'Uninitialized variables should come last in the declaration.',
                  });
               }
            }
         }

      }

      return {
         'VariableDeclaration': validateVar,
      };
   },

};
