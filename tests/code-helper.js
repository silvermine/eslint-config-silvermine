/**
 * @fileoverview Sugar syntax for making code templates easier to read
 */

'use strict';

function code() {
   return '\n' + Array.prototype.join.call(arguments, '\n') + '\n';
}

module.exports = code;
