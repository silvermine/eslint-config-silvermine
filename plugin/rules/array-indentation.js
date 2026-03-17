/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
'use strict';

var RuleHelper = require('../helpers/rule-helper');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {

   meta: {
      type: 'layout',
      schema: [],
   },

   create: function(context) {
      var helper = new RuleHelper(context);

      // --------------------------------------------------------------------------
      // Helpers
      // --------------------------------------------------------------------------

      function validateArrayIndentation(node) {
         var lineIndentationMatches = helper.lineIndentationMatches(node.loc.start.line, node.loc.end.line);

         if (!lineIndentationMatches) {
            context.report({
               node: node,
               message: 'Array expressions must begin and end with the same indentation',
            });
         }

         if (node.elements.length > 0 && node.elements[0].loc.start.line === node.loc.start.line) {
            context.report({
               node: node,
               message: 'The first element in multiline array expressions must be on a new line',
            });
         }

         if (node.elements.length > 0 && node.elements[node.elements.length - 1].loc.start.line === node.loc.end.line) {
            context.report({
               node: node,
               message: 'The closing parenthesis in multiline array expressions must be on a new line',
            });
         }
      }

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {
         'ArrayExpression': function(node) {
            // validate multi-line array indentation
            if (node.loc.start.line !== node.loc.end.line) {
               validateArrayIndentation(node);
            }
         },
      };
   },

};
