/**
 * @fileoverview Multiple function declarations in a call expression should not be allowed.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

   //--------------------------------------------------------------------------
   // Helpers
   //--------------------------------------------------------------------------

   function checkCallExpression(node) {
      var hasFunctionArgument = false;

      node.arguments.forEach(function(argument) {
         if (argument.type === 'FunctionExpression') {
            if (hasFunctionArgument) {
               context.report({
                  node: argument,
                  message: 'Too many function declarations used as arguments'
               });
            }

            hasFunctionArgument = true;
         }
      });
   }

   //--------------------------------------------------------------------------
   // Public
   //--------------------------------------------------------------------------

   return {
      'CallExpression': checkCallExpression
   };
};
