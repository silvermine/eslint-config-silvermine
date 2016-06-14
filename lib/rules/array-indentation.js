/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
'use strict';

var RuleHelper = require('../helpers/rule-helper');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
   var helper = new RuleHelper(context);

   //--------------------------------------------------------------------------
   // Helpers
   //--------------------------------------------------------------------------

   function validateArrayIndentation(node) {
      var lineIndentationMatches = helper.lineIndentationMatches(node.loc.start.line, node.loc.end.line);

      if (!lineIndentationMatches) {
         context.report({
            node: node,
            message: 'Array expressions must begin and end with the same indentation',
         });
      }
   }

   //--------------------------------------------------------------------------
   // Public
   //--------------------------------------------------------------------------

   return {
      'ArrayExpression': function(node) {
         if (node.loc.start.line !== node.loc.end.line) {
            validateArrayIndentation(node);
         }
      }
   };
};
