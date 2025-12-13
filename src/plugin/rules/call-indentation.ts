/**
 * @fileoverview Check indentation at the beginning and end of a function call
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Rule } from 'eslint';
import type { CallExpression, Expression, SpreadElement } from 'estree';
import RuleHelper from '../helpers/rule-helper.js';

type Callee = CallExpression['callee'] & { property?: { loc: { start: { line: number } } } };
type CallNode = CallExpression & Rule.NodeParentExtension;

const MSG_ARG_ON_NEW_LINE = 'When arguments are on their own line, they must all be on their own line',
      MSG_PAREN_ON_NEW_LINE = 'Closing parenthesis should be on a new line',
      MSG_CALL_SAME_INDENT = 'Call expressions must begin and end with the same indentation',
      MSG_ARG_ON_SAME_LINE = 'Argument should start on the ending line of previous argument',
      MSG_PAREN_ON_SAME_LINE = 'Closing parenthesis should be on same line as last argument',
      MSG_MULTIPLE_MULTILINE_ARGS = 'Only one multiline argument allowed';

type Argument = Expression | SpreadElement;
type NodesByLine = Record<number, Argument[]>;

const rule: Rule.RuleModule = {

   meta: {
      type: 'layout',
      schema: [],
   },

   create(context) {
      const helper = new RuleHelper(context);

      // --------------------------------------------------------------------------
      // Helpers
      // --------------------------------------------------------------------------

      function validateCallIndentation(node: CallNode): void {
         const callee = node.callee as Callee,
               calleeEndLine = callee.loc?.end.line ?? 0,
               nodeEndLine = node.loc?.end.line ?? 0,
               lineIndentationMatches = helper.lineIndentationMatches(calleeEndLine, nodeEndLine),
               endParenLocation = node.loc?.end,
               lastArg = node.arguments[node.arguments.length - 1],
               firstArg = node.arguments[0],
               indentAmount = helper.indent,
               calleeIndent = helper.lineIndent(callee.loc?.start.line ?? 0),
               startLine = callee.property?.loc.start.line ?? callee.loc?.start.line ?? 0,
               allArgsNewLine = startLine !== (firstArg.loc?.start.line ?? 0),
               nodesByStartLine: NodesByLine = {};

         let countMultilineArgs = 0,
             prevArg: Argument | undefined;

         node.arguments.forEach((arg) => {

            const argLoc = arg.loc!;

            // check if the arg is multiline
            if (argLoc.start.line !== argLoc.end.line) {
               countMultilineArgs = countMultilineArgs + 1;
            }

            // get arguments grouped by their start line for easier processing later
            if (nodesByStartLine[argLoc.start.line]) {
               nodesByStartLine[argLoc.start.line].push(arg);
            } else {
               nodesByStartLine[argLoc.start.line] = [ arg ];
            }
         });

         // only allow one multiline argument
         if (countMultilineArgs > 1) {
            context.report({
               node: node,
               loc: node.loc!.start,
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
            node.arguments.forEach((arg) => {
               const loc = arg.loc!;

               // check that all arguments start on their own line
               if (nodesByStartLine[loc.start.line].length > 1) {
                  context.report({
                     node: node,
                     loc: loc.start,
                     message: MSG_ARG_ON_NEW_LINE,
                  });
                  return;
               }

               // check indentation
               if (helper.lineIndent(loc.start.line) !== (calleeIndent + indentAmount)) {
                  context.report({
                     node: node,
                     loc: loc.start,
                     message: 'Expected indent of {{expected}}, found indent of {{found}}',
                     data: {
                        expected: calleeIndent + indentAmount,
                        found: helper.lineIndent(loc.start.line),
                     },
                  });
               }
            });

            // check if closing paren is on a new line
            if (endParenLocation!.line === lastArg.loc!.end.line) {
               context.report({
                  node: node,
                  loc: node.loc!.end,
                  message: MSG_PAREN_ON_NEW_LINE,
               });
            }
         } else {
            node.arguments.forEach((arg) => {
               const loc = arg.loc!;

               // check that all arguments start on the same line as the previous ends
               if (prevArg && prevArg.loc!.end.line !== loc.start.line) {
                  context.report({
                     node: arg,
                     loc: loc.start,
                     message: MSG_ARG_ON_SAME_LINE,
                  });
               }

               prevArg = arg;
            });

            // check that paren is on the same line of last arg end line
            if (endParenLocation!.line !== lastArg.loc!.end.line) {
               context.report({
                  node: node,
                  loc: node.loc!.end,
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
            if (node.callee.loc!.end.line !== node.loc!.end.line) {
               validateCallIndentation(node);
            }
         },
      };

   },
};

export default rule;
