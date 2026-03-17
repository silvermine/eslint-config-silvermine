/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
'use strict';

var MSG_ARG_ON_NEW_LINE = 'When arguments are on their own line, they must all be on their own line',
    MSG_PAREN_ON_NEW_LINE = 'Closing parenthesis should be on a new line',
    MSG_CALL_SAME_INDENT = 'Call expressions must begin and end with the same indentation',
    MSG_ARG_ON_SAME_LINE = 'Argument should start on the ending line of previous argument',
    MSG_PAREN_ON_SAME_LINE = 'Closing parenthesis should be on same line as last argument',
    MSG_MULTIPLE_MULTILINE_ARGS = 'Only one multiline argument allowed',
    RuleHelper = require('../helpers/rule-helper'),
    { isEmpty } = require('@silvermine/toolbox');

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

      function validateCallIndentation(node) {
         var lineIndentationMatches, endParenLocation, lastArg, firstArg,
             indentAmount, calleeIndent, startLine, allArgsNewLine,
             countMultilineArgs, nodesByStartLine, prevArg;

         if (isEmpty(node.arguments)) {
            return;
         }

         lineIndentationMatches = helper.lineIndentationMatches(node.callee.loc.end.line, node.loc.end.line);
         endParenLocation = node.loc.end;
         lastArg = node.arguments[node.arguments.length - 1];
         firstArg = node.arguments[0];
         indentAmount = helper.indent;
         calleeIndent = helper.lineIndent(node.callee.loc.start.line);
         startLine = node.callee.property ? node.callee.property.loc.start.line : node.callee.loc.start.line;
         allArgsNewLine = startLine !== firstArg.loc.start.line;
         countMultilineArgs = 0;
         nodesByStartLine = {};

         node.arguments.forEach(function(arg) {
            // check if the arg is multiline
            if (arg.loc.start.line !== arg.loc.end.line) {
               countMultilineArgs = countMultilineArgs + 1;
            }

            // get arguments grouped by their start line for
            // easier processing later
            if (nodesByStartLine[arg.loc.start.line]) {
               nodesByStartLine[arg.loc.start.line].push(arg);
            } else {
               nodesByStartLine[arg.loc.start.line] = [ arg ];
            }
         });

         // only allow one multiline argument
         if (countMultilineArgs > 1) {
            context.report({
               node: node,
               loc: node.loc.start,
               message: MSG_MULTIPLE_MULTILINE_ARGS,
            });
         }

         // check if closing parenthesis is correctly indented
         if (!lineIndentationMatches) {
            context.report({
               node: node,
               message: MSG_CALL_SAME_INDENT,
            });
         }

         // check if first arg is on a new line
         if (allArgsNewLine) {
            node.arguments.forEach(function(arg) {
               // check that all arguments start on their own line
               if (nodesByStartLine[arg.loc.start.line].length > 1) {
                  context.report({
                     node: node,
                     loc: arg.loc.start,
                     message: MSG_ARG_ON_NEW_LINE,
                  });
                  return;
               }

               // check indentation
               if (helper.lineIndent(arg.loc.start.line) !== (calleeIndent + indentAmount)) {
                  context.report({
                     node: node,
                     loc: arg.loc.start,
                     message: 'Expected indent of {{expected}}, found indent of {{found}}',
                     data: {
                        expected: calleeIndent + indentAmount,
                        found: helper.lineIndent(arg.loc.start.line),
                     },
                  });
               }
            });

            // check if closing paren is on a new line
            if (endParenLocation.line === lastArg.loc.end.line) {
               context.report({
                  node: node,
                  loc: node.loc.end,
                  message: MSG_PAREN_ON_NEW_LINE,
               });
            }
         } else {
            node.arguments.forEach(function(arg) {
               // check that all arguments start on the same line as the
               // previous one ends on
               if (prevArg && prevArg.loc.end.line !== arg.loc.start.line) {
                  context.report({
                     node: arg,
                     loc: arg.loc.start,
                     message: MSG_ARG_ON_SAME_LINE,
                  });
               }

               prevArg = arg;
            });

            // check that paren is on the same line of last arg end line
            if (endParenLocation.line !== lastArg.loc.end.line) {
               context.report({
                  node: node,
                  loc: node.loc.end,
                  message: MSG_PAREN_ON_SAME_LINE,
               });
            }
         }
      }

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {
         'CallExpression': function(node) {
            // validate multi-line function indentation
            if (node.callee.loc.end.line !== node.loc.end.line) {
               validateCallIndentation(node);
            }
         },
      };

   },

};
