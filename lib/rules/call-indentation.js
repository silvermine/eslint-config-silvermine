/**
 * @fileoverview Check indentation at the beginning and end of a function call
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

   function validateCallIndentation(node) {
      var lineIndentationMatches = helper.lineIndentationMatches(node.callee.loc.end.line, node.loc.end.line);

      if (!lineIndentationMatches) {
         context.report({
            node: node,
            message: 'Call expressions must begin and end with the same indentation',
         });
      }
   }

   //--------------------------------------------------------------------------
   // Public
   //--------------------------------------------------------------------------

   return {
      'CallExpression': function(node) {
         // validate multi-line function indentation
         if (node.callee.loc.end.line !== node.loc.end.line) {
            validateCallIndentation(node);
         }
      }
   };

};
