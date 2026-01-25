/**
 * @fileoverview Enforce formatting for chained calls
 */
// eslint-disable-next-line @stylistic/max-len -- Disable comment
/* eslint-disable @typescript-eslint/no-non-null-assertion -- Forked ESLint rule uses assertions */
import type { Rule } from 'eslint';
import type { MemberExpression, CallExpression, Node, Identifier } from 'estree';
import RuleHelper from '../helpers/rule-helper.js';

type MemberNode = (MemberExpression | CallExpression) & Rule.NodeParentExtension;

const rule: Rule.RuleModule = {

   meta: {
      type: 'layout',
      fixable: 'whitespace',
      schema: [
         {
            type: 'object',
            properties: {
               IndentChar: {
                  enum: [ 'space', 'tab' ],
               },
               IndentAmount: {
                  type: 'integer',
                  minimum: 1,
               },
            },
            additionalProperties: false,
         },
      ],
   },

   create(context) {
      const helper = new RuleHelper(context);

      function getFixRange(node: MemberExpression): [ number, number ] {
         const sourceCode = helper.sourceCode,
               propertyToken = sourceCode.getFirstToken(node.property as Node),
               dotToken = propertyToken ? sourceCode.getTokenBefore(propertyToken) : null;

         if (!propertyToken || !dotToken) {
            return [ node.object.range![1], node.property.range![0] ];
         }

         const objectEndToken = sourceCode.getTokenBefore(dotToken);

         if (!objectEndToken) {
            return [ node.object.range![1], node.property.range![0] ];
         }

         return [ objectEndToken.range![1], propertyToken.range![0] ];
      }

      function validateSingleLineMemberExpression(node: MemberExpression): void {
         if (node.object.loc!.start.line !== node.property.loc!.start.line) {
            context.report({
               node: node.property as Node,
               message: 'Identifier "{{ identifier }}" should be on a new line',
               data: {
                  identifier: (node.property as Identifier).name,
               },
               fix(fixer) {
                  const firstLineIndent = helper.lineIndent(node.object.loc!.end.line),
                        fixString = '\n' + helper.indentChar.repeat(firstLineIndent) + '.',
                        range = getFixRange(node);

                  return fixer.replaceTextRange(range, fixString);
               },
            });
         }
      }

      function validateMultiLineMemberExpression(node: MemberExpression & Rule.NodeParentExtension): void {
         const firstLineIndent = helper.lineIndent(node.object.loc!.start.line),
               expectedIndent = firstLineIndent + helper.indent,
               propertyLineIndent = helper.lineIndent(node.property.loc!.start.line),
               lastLineIndent = helper.lineIndent(node.object.loc!.end.line),
               sameLine = node.object.loc!.start.line === node.object.loc!.end.line;

         if (propertyLineIndent !== expectedIndent) {
            context.report({
               node: node.property as Node,
               message: 'Expected identifier "{{ identifier }}" to be indented {{ expectedIndent }} chars (char: "{{ indentChar }}")',
               data: {
                  identifier: (node.property as Identifier).name,
                  expectedIndent: String(expectedIndent),
                  indentChar: (helper.indentChar === '\t' ? 'tab' : helper.indentChar),
               },
               fix(fixer) {
                  const fixString = '\n' + helper.indentChar.repeat(expectedIndent) + '.',
                        range = getFixRange(node);

                  if (node.property.loc!.start.line === node.parent.loc!.end.line) {
                     return fixer.replaceTextRange(range, fixString);
                  }
                  return null;
               },
            });
         }

         if (!sameLine && lastLineIndent !== propertyLineIndent) {
            context.report({
               node: node.property as Node,
               message: 'Expected identifier "{{ identifier }}" to align with preceding {{ object }}',
               data: {
                  identifier: (node.property as Identifier).name,
                  object: node.object.type,
               },
            });
         }
      }

      function checkMemberExpression(node: MemberNode): void {
         if (node.type !== 'MemberExpression') {
            return;
         }

         let numberOfLines: number | null = null;

         if (node.property && node.object) {
            numberOfLines = node.property.loc!.start.line - node.object.loc!.end.line + 1;
         }

         // If this is an array accessor, pass if it's on the same line as its parent
         // member expression's EOL.
         if (node.property && node.computed && node.property.type === 'Literal') {
            const parentNode = node.parent;

            if (parentNode && parentNode.loc!.end.line === node.property.loc!.start.line) {
               return;
            }
         }

         if ((node.object && node.object.type === 'FunctionExpression') || numberOfLines === null) {
            return;
         }

         const objectComments = helper.sourceCode.getCommentsAfter(node.object as Node);

         // if there are leading comments, we need to subtract their lines from the number
         // of lines of the expression or we will not be able to put comments between
         // calls. Note: trailing comments of the `node.object` are leading comments for
         // this property
         for (const comment of objectComments) {
            const commentLines = comment.loc!.end.line - comment.loc!.start.line + 1;

            // make sure the comment is not on the ending line of the previous call
            if (comment.loc!.start.line > node.object.loc!.end.line) {
               numberOfLines = numberOfLines - commentLines;
            }
         }

         // check to see if member expression spans multiple lines
         if (numberOfLines === 1) {
            validateSingleLineMemberExpression(node);
         } else if (numberOfLines === 2) {
            validateMultiLineMemberExpression(node);
         } else {
            context.report({
               node: node as Node,
               message: 'Member expression should not span more than 2 lines',
            });
         }
      }

      return {
         'CallExpression, MemberExpression': checkMemberExpression,
      };

   },
};

export default rule;
