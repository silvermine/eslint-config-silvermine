/**
 * @fileoverview Check indentation at the beginning and end of a literal array expression
 */
import type { Rule } from 'eslint';
import type { ArrayExpression } from 'estree';
import RuleHelper from '../helpers/rule-helper.js';

const rule: Rule.RuleModule = {

   meta: {
      type: 'layout',
      schema: [],
   },

   create(context) {
      const helper = new RuleHelper(context);

      function validateArrayIndentation(node: ArrayExpression): void {
         if (!node.loc) {
            return;
         }

         const lineIndentationMatches = helper.lineIndentationMatches(node.loc.start.line, node.loc.end.line);

         if (!lineIndentationMatches) {
            context.report({
               node,
               message: 'Array expressions must begin and end with the same indentation',
            });
         }

         const firstEl = node.elements[0],
               lastEl = node.elements[node.elements.length - 1];

         if (node.elements.length > 0 && firstEl?.loc?.start.line === node.loc.start.line) {
            context.report({
               node,
               message: 'The first element in multiline array expressions must be on a new line',
            });
         }

         if (node.elements.length > 0 && lastEl?.loc?.start.line === node.loc.end.line) {
            context.report({
               node,
               message: 'The closing parenthesis in multiline array expressions must be on a new line',
            });
         }
      }

      return {
         ArrayExpression(node: ArrayExpression) {
            if (node.loc && node.loc.start.line !== node.loc.end.line) {
               validateArrayIndentation(node);
            }
         },
      };
   },

};

export default rule;
