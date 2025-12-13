/**
 * Prevents multiple lines in the parentheses of if/else if/for/for in/while/do while
 * statements.
 */
import type { Rule } from 'eslint';
import type {
   WhileStatement,
   DoWhileStatement,
   ForStatement,
   ForInStatement,
   IfStatement,
} from 'estree';

type ConditionalNode = WhileStatement | DoWhileStatement | ForStatement | ForInStatement | IfStatement;

const rule: Rule.RuleModule = {

   meta: {
      schema: [],
   },

   create(context) {
      // eslint-disable-next-line complexity -- Inherent complexity checking many types
      function checkStatement(node: ConditionalNode): void {
         let checkLine = false;

         const startLine = node.loc?.start.line ?? 0,
               endLine = node.loc?.end.line ?? 0;

         if (node.type === 'DoWhileStatement') {
            // DoWhileStatement has the test at the end of the block.
            const testStart = node.test.loc?.start.line ?? 0,
                  testEnd = node.test.loc?.end.line ?? 0;

            checkLine = (endLine !== testStart) || (endLine !== testEnd);
         } else if (node.type === 'ForStatement') {
            // ForStatement has 3 nodes in parens (init, test, update)
            if (node.init?.loc) {
               checkLine = checkLine || (startLine !== node.init.loc.start.line);
               checkLine = checkLine || (startLine !== node.init.loc.end.line);
            }
            if (node.test?.loc) {
               checkLine = checkLine || (startLine !== node.test.loc.start.line);
               checkLine = checkLine || (startLine !== node.test.loc.end.line);
            }
            if (node.update?.loc) {
               checkLine = checkLine || (startLine !== node.update.loc.start.line);
               checkLine = checkLine || (startLine !== node.update.loc.end.line);
            }
         } else if (node.type === 'ForInStatement') {
            // ForInStatement has 2 nodes in parens (left, right)
            const leftLoc = node.left.loc,
                  rightLoc = node.right.loc;

            if (leftLoc) {
               checkLine = (startLine !== leftLoc.start.line) || (startLine !== leftLoc.end.line);
            }
            if (rightLoc) {
               checkLine = checkLine || (startLine !== rightLoc.start.line);
               checkLine = checkLine || (startLine !== rightLoc.end.line);
            }
         } else {
            // While and If have a test node that should be on the start line
            const testLoc = node.test.loc;

            if (testLoc) {
               checkLine = (startLine !== testLoc.start.line) || (startLine !== testLoc.end.line);
            }
         }

         if (checkLine) {
            context.report({
               node,
               message: '{{ identifier }} should not span multiple lines.',
               data: {
                  identifier: node.type,
               },
            });
         }
      }

      return {
         WhileStatement: checkStatement,
         DoWhileStatement: checkStatement,
         ForStatement: checkStatement,
         ForInStatement: checkStatement,
         IfStatement: checkStatement,
      };
   },

};

export default rule;
