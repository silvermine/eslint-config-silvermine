'use strict';

// eslint/lib/rules/utils/ast-utils.js

/**
 * Checks if the given token is a semicolon token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
function isSemicolonToken(token) {
   return token.value === ';' && token.type === 'Punctuator';
}

module.exports = {

   /**
    * Determines whether two adjacent tokens are on the same line.
    * @param {Object} left The left token object.
    * @param {Object} right The right token object.
    * @returns {boolean} Whether or not the tokens are on the same line.
    * @public
    */
   isTokenOnSameLine(left, right) {
      return left.loc.end.line === right.loc.start.line;
   },

   isSemicolonToken,

   isNotSemicolonToken(token) {
      return !isSemicolonToken(token);
   },

   STATEMENT_LIST_PARENTS: new Set([ 'Program', 'BlockStatement', 'StaticBlock', 'SwitchCase' ]),
};
