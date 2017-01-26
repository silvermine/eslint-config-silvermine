/**
* Forked from: https://github.com/eslint/eslint/blob/v2.13.0/lib/rules/indent.js
* This modification adds the `VariableDeclaratorOffset` configuration variable
* that allows specifying how many spaces a multi-line variable declaration should
* be offset from the normal indentation level. For example:
*
* var something,
*     anotherSomething,
*     somethingElse;
*
* The multi-line variable declaration is indented 4 spaces from the normal indentation level,
* so VariableDeclaratorOffset should be set to '1' (i.e. indent of 3, offset adds 1, total indent 4).
* es6 const declarations would need an offset of 3 (indent of 3, offset adds 3, total indent 6) to line up.
*
* Example configuration:
*  "silvermine/indent": [ "error", 3, { "VariableDeclaratorOffset": { "var": 1, "let": 1, "const": 3 }, "SwitchCase": 1 } ]
*
*/

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
var util = require('util'),
    lodashAssign = require('lodash.assign'),
    _ = require('underscore');

module.exports = {
   meta: {
      docs: {
         description: 'enforce consistent indentation',
         category: 'Stylistic Issues',
         recommended: false
      },

      fixable: 'whitespace',

      schema: [
         {
            oneOf: [
               {
                  'enum': [ 'tab' ]
               },
               {
                  type: 'integer',
                  minimum: 0
               }
            ]
         },
         {
            type: 'object',
            properties: {
               SwitchCase: {
                  type: 'integer',
                  minimum: 0
               },
               VariableDeclarator: {
                  oneOf: [
                     {
                        type: 'integer',
                        minimum: 0
                     },
                     {
                        type: 'object',
                        properties: {
                           'var': {
                              type: 'integer',
                              minimum: 0
                           },
                           'let': {
                              type: 'integer',
                              minimum: 0
                           },
                           'const': {
                              type: 'integer',
                              minimum: 0
                           }
                        }
                     }
                  ]
               },
               VariableDeclaratorOffset: {
                  oneOf: [
                     {
                        type: 'integer',
                        minimum: Number.MIN_VALUE
                     },
                     {
                        type: 'object',
                        properties: {
                           'var': {
                              type: 'integer',
                              minimum: Number.MIN_VALUE
                           },
                           'let': {
                              type: 'integer',
                              minimum: Number.MIN_VALUE
                           },
                           'const': {
                              type: 'integer',
                              minimum: Number.MIN_VALUE
                           }
                        }
                     }
                  ]
               }
            },
            additionalProperties: false
         }
      ]
   },

   create: function(context) {

      var MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.',
          DEFAULT_VARIABLE_INDENT = 1,
          DEFAULT_VARIABLE_INDENT_OFFSET = 0,
          indentType = 'space',
          indentSize = 4,
          sourceCode = context.getSourceCode(),
          options, opts, variableDeclaratorRules, variableDeclaratorOffsetRules, indentPattern, caseIndentStore;

      options = {
         SwitchCase: 0,
         VariableDeclarator: {
            'var': DEFAULT_VARIABLE_INDENT,
            'let': DEFAULT_VARIABLE_INDENT,
            'const': DEFAULT_VARIABLE_INDENT
         },
         VariableDeclaratorOffset: {
            'var': DEFAULT_VARIABLE_INDENT_OFFSET,
            'let': DEFAULT_VARIABLE_INDENT_OFFSET,
            'const': DEFAULT_VARIABLE_INDENT_OFFSET
         }
      };


      if (context.options.length) {
         if (context.options[0] === 'tab') {
            indentSize = 1;
            indentType = 'tab';
         } else /* istanbul ignore else : this will be caught by options validation */ if (typeof context.options[0] === 'number') {
            indentSize = context.options[0];
            indentType = 'space';
         }

         if (context.options[1]) {
            opts = context.options[1];

            options.SwitchCase = opts.SwitchCase || 0;
            variableDeclaratorRules = opts.VariableDeclarator;

            if (typeof variableDeclaratorRules === 'number') {
               options.VariableDeclarator = {
                  'var': variableDeclaratorRules,
                  'let': variableDeclaratorRules,
                  'const': variableDeclaratorRules
               };
            } else if (typeof variableDeclaratorRules === 'object') {
               lodashAssign(options.VariableDeclarator, variableDeclaratorRules);
            }

            variableDeclaratorOffsetRules = opts.VariableDeclaratorOffset;

            if (typeof variableDeclaratorOffsetRules === 'number') {
               options.VariableDeclaratorOffset = {
                  'var': variableDeclaratorOffsetRules,
                  'let': variableDeclaratorOffsetRules,
                  'const': variableDeclaratorOffsetRules
               };
            } else if (typeof variableDeclaratorOffsetRules === 'object') {
               lodashAssign(options.VariableDeclaratorOffset, variableDeclaratorOffsetRules);
            }
         }
      }

      indentPattern = {
         normal: indentType === 'space' ? /^ +/ : /^\t+/,
         excludeCommas: indentType === 'space' ? /^[ ,]+/ : /^[\t,]+/
      };

      caseIndentStore = {};

      /**
      * Reports a given indent violation and properly pluralizes the message
      * @param {ASTNode} node Node violating the indent rule
      * @param {int} needed Expected indentation character count
      * @param {int} gotten Indentation character count in the actual node/code
      * @param {Object=} loc Error line and column location
      * @param {boolean} isLastNodeCheck Is the error for last node check
      * @returns {void}
      */
      function report(node, needed, gotten, loc, isLastNodeCheck) {
         var msgContext, indentChar;

         msgContext = {
            needed: needed,
            type: indentType,
            characters: needed === 1 ? 'character' : 'characters',
            gotten: gotten
         };
         indentChar = indentType === 'space' ? ' ' : '\t';

         /**
         * Responsible for fixing the indentation issue fix
         * @returns {Function} function to be executed by the fixer
         * @private
         */
         function getFixerFunction() {
            var rangeToFix = [],
                spaces;

            if (needed > gotten) {
               spaces = String(new Array(needed - gotten + 1).join(indentChar));  // replace with repeat in future

               if (isLastNodeCheck === true) {
                  rangeToFix = [
                     node.range[1] - 1,
                     node.range[1] - 1
                  ];
               } else {
                  rangeToFix = [
                     node.range[0],
                     node.range[0]
                  ];
               }

               return function(fixer) {
                  return fixer.insertTextBeforeRange(rangeToFix, spaces);
               };
            }

            if (isLastNodeCheck === true) {
               rangeToFix = [
                  node.range[1] - (gotten - needed) - 1,
                  node.range[1] - 1
               ];
            } else {
               rangeToFix = [
                  node.range[0] - (gotten - needed),
                  node.range[0]
               ];
            }

            return function(fixer) {
               return fixer.removeRange(rangeToFix);
            };
         }

         if (loc) {
            context.report({
               node: node,
               loc: loc,
               message: MESSAGE,
               data: msgContext,
               fix: getFixerFunction()
            });
         } else {
            context.report({
               node: node,
               message: MESSAGE,
               data: msgContext,
               fix: getFixerFunction()
            });
         }
      }

      /**
      * Get node indent
      * @param {ASTNode|Token} node Node to examine
      * @param {boolean} [byLastLine=false] get indent of node's last line
      * @param {boolean} [excludeCommas=false] skip comma on start of line
      * @returns {int} Indent
      */
      function getNodeIndent(node, byLastLine, excludeCommas) {
         var token = byLastLine ? sourceCode.getLastToken(node) : sourceCode.getFirstToken(node),
             src = sourceCode.getText(token, token.loc.start.column),
             regExp = excludeCommas ? indentPattern.excludeCommas : indentPattern.normal,
             indent = regExp.exec(src);

         return indent ? indent[0].length : 0;
      }

      /**
      * Checks node is the first in its own start line. By default it looks by start line.
      * @param {ASTNode} node The node to check
      * @param {boolean} [byEndLocation=false] Lookup based on start position or end
      * @returns {boolean} true if its the first in the its start line
      */
      function isNodeFirstInLine(node, byEndLocation) {
         var firstToken = byEndLocation === true ? sourceCode.getLastToken(node, 1) : sourceCode.getTokenBefore(node),
             startLine = byEndLocation === true ? node.loc.end.line : node.loc.start.line,
             endLine = firstToken ? firstToken.loc.end.line : -1;

         return startLine !== endLine;
      }

      /**
      * Check indent for node
      * @param {ASTNode} node Node to check
      * @param {int} indent needed indent
      * @param {boolean} [excludeCommas=false] skip comma on start of line
      * @returns {void}
      */
      function checkNodeIndent(node, indent, excludeCommas) {
         var nodeIndent = getNodeIndent(node, false, excludeCommas);

         if (node.type !== 'ArrayExpression' && node.type !== 'ObjectExpression' && nodeIndent !== indent && isNodeFirstInLine(node)) {
            report(node, indent, nodeIndent);
         }
      }

      /**
      * Check indent for nodes list
      * @param {ASTNode[]} nodes list of node objects
      * @param {int} indent needed indent
      * @param {boolean} [excludeCommas=false] skip comma on start of line
      * @returns {void}
      */
      function checkNodesIndent(nodes, indent, excludeCommas) {
         nodes.forEach(function(node) {
            var elseToken;

            if (node.type === 'IfStatement' && node.alternate) {
               elseToken = sourceCode.getTokenBefore(node.alternate);

               checkNodeIndent(elseToken, indent, excludeCommas);
            }
            checkNodeIndent(node, indent, excludeCommas);
         });
      }

      /**
      * Check last node line indent this detects, that block closed correctly
      * @param {ASTNode} node Node to examine
      * @param {int} lastLineIndent needed indent
      * @returns {void}
      */
      function checkLastNodeLineIndent(node, lastLineIndent) {
         var lastToken = sourceCode.getLastToken(node),
             endIndent = getNodeIndent(lastToken, true);

         if (endIndent !== lastLineIndent && isNodeFirstInLine(node, true)) {
            report(
               node,
               lastLineIndent,
               endIndent,
               { line: lastToken.loc.start.line, column: lastToken.loc.start.column },
               true
            );
         }
      }

      /**
      * Check first node line indent is correct
      * @param {ASTNode} node Node to examine
      * @param {int} firstLineIndent needed indent
      * @returns {void}
      */
      function checkFirstNodeLineIndent(node, firstLineIndent) {
         var startIndent = getNodeIndent(node, false);

         if (startIndent !== firstLineIndent && isNodeFirstInLine(node)) {
            report(
               node,
               firstLineIndent,
               startIndent,
               { line: node.loc.start.line, column: node.loc.start.column }
            );
         }
      }

      /**
      * Returns the VariableDeclarator based on the current node
      * if not present then return null
      * @param {ASTNode} node node to examine
      * @returns {ASTNode|void} if found then node otherwise null
      */
      function getVariableDeclaratorNode(node) {
         var parent = node.parent;

         while (parent.type !== 'VariableDeclarator' && parent.type !== 'Program') {
            parent = parent.parent;
         }

         return parent.type === 'VariableDeclarator' ? parent : null;
      }

      /**
      * Check to see if the node is part of the multi-line variable declaration.
      * Also if its on the same line as the varNode
      * @param {ASTNode} node node to check
      * @param {ASTNode} varNode variable declaration node to check against
      * @returns {boolean} True if all the above condition satisfy
      */
      function isNodeInVarOnTop(node, varNode) {
         return varNode &&
         varNode.parent.loc.start.line === node.loc.start.line &&
         varNode.parent.declarations.length > 1;
      }

      /**
      * Check to see if the argument before the callee node is multi-line and
      * there should only be 1 argument before the callee node
      * @param {ASTNode} node node to check
      * @returns {boolean} True if arguments are multi-line
      */
      function isArgBeforeCalleeNodeMultiline(node) {
         var parent = node.parent;

         if (parent.arguments.length >= 2 && parent.arguments[1] === node) {
            return parent.arguments[0].loc.end.line > parent.arguments[0].loc.start.line;
         }

         return false;
      }

      /**
      * Check indent for function block content
      * @param {ASTNode} node node to examine
      * @returns {void}
      */
      function checkIndentInFunctionBlock(node) {

         /*
         * Search first caller in chain.
         * Ex.:
         *
         * Models <- Identifier
         *   .User
         *   .find()
         *   .exec(function() {
         *   // function body
         * });
         *
         * Looks for 'Models'
         */
         var calleeNode = node.parent, // FunctionExpression
             indent, calleeParent, parentVarNode, sameline;

         if (calleeNode.parent && (calleeNode.parent.type === 'Property' || calleeNode.parent.type === 'ArrayExpression')) {
            // If function is part of array or object, comma can be put at left
            indent = getNodeIndent(calleeNode, false, false);
         } else {

            // If function is standalone, simple calculate indent
            indent = getNodeIndent(calleeNode);
         }

         if (calleeNode.parent.type === 'CallExpression') {
            calleeParent = calleeNode.parent;

            sameline = calleeParent.callee.loc.start.line === calleeParent.callee.loc.end.line;

            if (calleeNode.type !== 'FunctionExpression' && calleeNode.type !== 'ArrowFunctionExpression') {
               if (calleeParent && calleeParent.loc.start.line < node.loc.start.line) {
                  indent = getNodeIndent(calleeParent);
               }
            } else if (isArgBeforeCalleeNodeMultiline(calleeNode) && sameline && !isNodeFirstInLine(calleeNode)) {
               indent = getNodeIndent(calleeParent);
            }
         }

         // function body indent should be indent + indent size
         indent += indentSize;

         // check if the node is inside a variable
         parentVarNode = getVariableDeclaratorNode(node);

         if (parentVarNode && isNodeInVarOnTop(node, parentVarNode)) {
            // eslint-disable-next-line max-len
            indent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind] + options.VariableDeclaratorOffset[parentVarNode.parent.kind];
         }

         if (node.body.length > 0) {
            checkNodesIndent(node.body, indent);
         }

         checkLastNodeLineIndent(node, indent - indentSize);
      }


      /**
      * Checks if the given node starts and ends on the same line
      * @param {ASTNode} node The node to check
      * @returns {boolean} Whether or not the block starts and ends on the same line.
      */
      function isSingleLineNode(node) {
         var lastToken = sourceCode.getLastToken(node),
             startLine = node.loc.start.line,
             endLine = lastToken.loc.end.line;

         return startLine === endLine;
      }

      /**
      * Check to see if the first element inside an array is an object and on the same line as the node
      * If the node is not an array then it will return false.
      * @param {ASTNode} node node to check
      * @returns {boolean} success/failure
      */
      function isFirstArrayElementOnSameLine(node) {
         if (node.type === 'ArrayExpression' && node.elements[0]) {
            return node.elements[0].loc.start.line === node.loc.start.line && node.elements[0].type === 'ObjectExpression';
         }

         return false;
      }

      /**
      * Check indent for array block content or object block content
      * @param {ASTNode} node node to examine
      * @returns {void}
      */
      function checkIndentInArrayOrObjectBlock(node) {
         var parentVarNode = getVariableDeclaratorNode(node),
             nodeIndent, elementsIndent, elements, parent, effectiveParent,
             parentTypeCheck, effectiveParentTypeCheck;

         // Skip inline
         if (isSingleLineNode(node)) {
            return;
         }

         elements = (node.type === 'ArrayExpression') ? node.elements : node.properties;

         // filter out empty elements example would be [ , 2] so remove first element as espree considers it as null
         elements = elements.filter(function(elem) {
            return elem !== null;
         });

         // Skip if first element is in same line with this node
         if (elements.length > 0 && elements[0].loc.start.line === node.loc.start.line) {
            return;
         }


         // TODO - come up with a better strategy in future
         if (isNodeFirstInLine(node)) {
            parent = node.parent;
            effectiveParent = parent;

            if (parent.type === 'MemberExpression') {
               if (isNodeFirstInLine(parent)) {
                  effectiveParent = parent.parent.parent;
               } else {
                  effectiveParent = parent.parent;
               }
            }
            nodeIndent = getNodeIndent(effectiveParent);

            effectiveParentTypeCheck = [ 'MemberExpression', 'ExpressionStatement', 'AssignmentExpression', 'Property' ];

            if (parentVarNode && parentVarNode.loc.start.line !== node.loc.start.line) {
               if (parent.type !== 'VariableDeclarator' || parentVarNode === parentVarNode.parent.declarations[0]) {

                  parentTypeCheck = [ 'ObjectExpression', 'ArrayExpression', 'CallExpression', 'ArrowFunctionExpression', 'NewExpression' ];

                  if (parent.type === 'VariableDeclarator' && parentVarNode.loc.start.line === effectiveParent.loc.start.line) {
                     // eslint-disable-next-line max-len
                     nodeIndent = nodeIndent + (indentSize * options.VariableDeclarator[parentVarNode.parent.kind]) + options.VariableDeclaratorOffset[parentVarNode.parent.kind];
                  } else if (_.contains(parentTypeCheck, parent.Type)) {
                     nodeIndent = nodeIndent + indentSize;
                  }
               }
            } else if (!parentVarNode && !isFirstArrayElementOnSameLine(parent) && !_.contains(effectiveParentTypeCheck, parent.type)) {
               nodeIndent = nodeIndent + indentSize;
            }

            elementsIndent = nodeIndent + indentSize;

            checkFirstNodeLineIndent(node, nodeIndent);
         } else {
            nodeIndent = getNodeIndent(node);
            elementsIndent = nodeIndent + indentSize;
         }

         /*
         * Check if the node is a multiple variable declaration; if so, then
         * make sure indentation takes that into account.
         */
         if (isNodeInVarOnTop(node, parentVarNode)) {
            // eslint-disable-next-line max-len
            elementsIndent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind] + options.VariableDeclaratorOffset[parentVarNode.parent.kind];
         }

         // Comma can be placed before property name
         checkNodesIndent(elements, elementsIndent, true);

         if (elements.length > 0) {

            // Skip last block line check if last item in same line
            if (elements[elements.length - 1].loc.end.line === node.loc.end.line) {
               return;
            }
         }

         checkLastNodeLineIndent(node, elementsIndent - indentSize);
      }

      /**
      * Check if the node or node body is a BlockStatement or not
      * @param {ASTNode} node node to test
      * @returns {boolean} True if it or its body is a block statement
      */
      function isNodeBodyBlock(node) {
         return node.type === 'BlockStatement' || node.type === 'ClassBody' || (node.body && node.body.type === 'BlockStatement') ||
         (node.consequent && node.consequent.type === 'BlockStatement');
      }

      /**
      * Check indentation for blocks
      * @param {ASTNode} node node to check
      * @returns {void}
      */
      function blockIndentationCheck(node) {
         var nodesToCheck = [],
             indent, statementsWithProperties, parentTypeCheck;

         // Skip inline blocks
         if (isSingleLineNode(node)) {
            return;
         }

         parentTypeCheck = [ 'FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression' ];

         if (node.parent && _.contains(parentTypeCheck, node.parent.type)) {
            checkIndentInFunctionBlock(node);
            return;
         }


         /*
         * For this statements we should check indent from statement beginning,
         * not from the beginning of the block.
         */
         statementsWithProperties = [
            'IfStatement', 'WhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement', 'DoWhileStatement', 'ClassDeclaration'
         ];

         if (node.parent && statementsWithProperties.indexOf(node.parent.type) !== -1 && isNodeBodyBlock(node)) {
            indent = getNodeIndent(node.parent);
         } else {
            indent = getNodeIndent(node);
         }

         if (node.type === 'IfStatement' && node.consequent.type !== 'BlockStatement') {
            nodesToCheck = [ node.consequent ];
         } else if (util.isArray(node.body)) {
            nodesToCheck = node.body;
         } else {
            nodesToCheck = [ node.body ];
         }

         if (nodesToCheck.length > 0) {
            checkNodesIndent(nodesToCheck, indent + indentSize);
         }

         if (node.type === 'BlockStatement') {
            checkLastNodeLineIndent(node, indent);
         }
      }

      /**
      * Filter out the elements which are on the same line of each other or the node.
      * basically have only 1 elements from each line except the variable declaration line.
      * @param {ASTNode} node Variable declaration node
      * @returns {ASTNode[]} Filtered elements
      */
      function filterOutSameLineVars(node) {
         return node.declarations.reduce(function(finalCollection, elem) {
            var lastElem = finalCollection[finalCollection.length - 1],
                elemLineCheck, lastElemLineCheck;

            elemLineCheck = (elem.loc.start.line !== node.loc.start.line && !lastElem);
            lastElemLineCheck = (lastElem && lastElem.loc.start.line !== elem.loc.start.line);

            if (elemLineCheck || lastElemLineCheck) {
               finalCollection.push(elem);
            }

            return finalCollection;
         }, []);
      }

      /**
      * Check indentation for variable declarations
      * @param {ASTNode} node node to examine
      * @returns {void}
      */
      function checkIndentInVariableDeclarations(node) {
         var elements = filterOutSameLineVars(node),
             nodeIndent = getNodeIndent(node),
             lastElement = elements[elements.length - 1],
             elementsIndent = nodeIndent + indentSize * options.VariableDeclarator[node.kind] + options.VariableDeclaratorOffset[node.kind],
             tokenBeforeLastElement;

         // Comma can be placed before declaration
         checkNodesIndent(elements, elementsIndent, true);

         // Only check the last line if there is any token after the last item
         if (sourceCode.getLastToken(node).loc.end.line <= lastElement.loc.end.line) {
            return;
         }

         tokenBeforeLastElement = sourceCode.getTokenBefore(lastElement);

         if (tokenBeforeLastElement.value === ',') {
            // Special case for comma-first syntax where the semicolon is indented
            checkLastNodeLineIndent(node, getNodeIndent(tokenBeforeLastElement));
         } else {
            checkLastNodeLineIndent(node, elementsIndent - indentSize);
         }
      }

      /**
      * Check and decide whether to check for indentation for blockless nodes
      * Scenarios are for or while statements without braces around them
      * @param {ASTNode} node node to examine
      * @returns {void}
      */
      function blockLessNodes(node) {
         if (node.body.type !== 'BlockStatement') {
            blockIndentationCheck(node);
         }
      }

      /**
      * Returns the expected indentation for the case statement
      * @param {ASTNode} node node to examine
      * @param {int} [switchIndent] indent for switch statement
      * @returns {int} indent size
      */
      function expectedCaseIndent(node, switchIndent) {
         var switchNode = (node.type === 'SwitchStatement') ? node : node.parent,
             caseIndent;

         if (caseIndentStore[switchNode.loc.start.line]) {
            return caseIndentStore[switchNode.loc.start.line];
         }

         if (typeof switchIndent === 'undefined') {
            switchIndent = getNodeIndent(switchNode);
         }

         if (switchNode.cases.length > 0 && options.SwitchCase === 0) {
            caseIndent = switchIndent;
         } else {
            caseIndent = switchIndent + (indentSize * options.SwitchCase);
         }

         caseIndentStore[switchNode.loc.start.line] = caseIndent;
         return caseIndent;
      }

      return {
         Program: function(node) {
            if (node.body.length > 0) {

               // Root nodes should have no indent
               checkNodesIndent(node.body, getNodeIndent(node));
            }
         },

         ClassBody: blockIndentationCheck,

         BlockStatement: blockIndentationCheck,

         WhileStatement: blockLessNodes,

         ForStatement: blockLessNodes,

         ForInStatement: blockLessNodes,

         ForOfStatement: blockLessNodes,

         DoWhileStatement: blockLessNodes,

         IfStatement: function(node) {
            if (node.consequent.type !== 'BlockStatement' && node.consequent.loc.start.line > node.loc.start.line) {
               blockIndentationCheck(node);
            }
         },

         VariableDeclaration: function(node) {
            if (node.declarations[node.declarations.length - 1].loc.start.line > node.declarations[0].loc.start.line) {
               checkIndentInVariableDeclarations(node);
            }
         },

         ObjectExpression: function(node) {
            checkIndentInArrayOrObjectBlock(node);
         },

         ArrayExpression: function(node) {
            checkIndentInArrayOrObjectBlock(node);
         },

         SwitchStatement: function(node) {

            // Switch is not a 'BlockStatement'
            var switchIndent = getNodeIndent(node),
                caseIndent = expectedCaseIndent(node, switchIndent);

            checkNodesIndent(node.cases, caseIndent);


            checkLastNodeLineIndent(node, switchIndent);
         },

         SwitchCase: function(node) {
            var caseIndent;

            // Skip inline cases
            if (isSingleLineNode(node)) {
               return;
            }
            caseIndent = expectedCaseIndent(node);

            checkNodesIndent(node.consequent, caseIndent + indentSize);
         }
      };

   }
};
