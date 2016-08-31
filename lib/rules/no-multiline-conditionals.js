/**
* Prevents multiple lines in the parentheses of if/else if/for/for in/while/do while statements.
*
* invalid exapample:
* if (
*     a < b &&
*     b > c
*     ) {
*    b == c;
* }
*
*/

'use strict';


module.exports = {

   create: function(context) {

      function checkStatement(node) {
         var checkLine;

         if (node.type === 'DoWhileStatement') {
            // DoWhileStatement has the test at the end of the block.
            checkLine = (node.loc.end.line !== node.test.loc.start.line) || (node.loc.end.line !== node.test.loc.end.line);
         } else if (node.type === 'ForStatement') {
            // ForStatement has 3 nodes in parens (init, test, update)
            checkLine = (node.loc.start.line !== node.init.loc.start.line) || (node.loc.start.line !== node.init.loc.end.line);
            checkLine = checkLine || (node.loc.start.line !== node.test.loc.start.line) || (node.loc.start.line !== node.test.loc.end.line);
            checkLine = checkLine || node.loc.start.line !== node.update.loc.start.line || node.loc.start.line !== node.update.loc.end.line;
         } else if (node.type === 'ForInStatement') {
            // ForInStatement has 2 nodes in parens (left, right)
            checkLine = (node.loc.start.line !== node.left.loc.start.line) || (node.loc.start.line !== node.left.loc.end.line);
            checkLine = checkLine || (node.loc.start.line !== node.right.loc.start.line);
            checkLine = checkLine || (node.loc.start.line !== node.right.loc.end.line);
         } else {
            // While and If have a test node that should be on the start line
            checkLine = (node.loc.start.line !== node.test.loc.start.line) || (node.loc.start.line !== node.test.loc.end.line);
         }

         if (checkLine) {
            context.report({
               node: node,
               message: '{{ identifier }} should not span multiple lines.',
               data: {
                  identifier: node.type,
               },
            });
         }
      }

      return {
         // loops
         'WhileStatement': checkStatement,
         'DoWhileStatement': checkStatement,
         'ForStatement': checkStatement,
         'ForInStatement': checkStatement,

         // Choice
         'IfStatement': checkStatement,
      };
   }

};
