/**
 * @fileoverview Hlper functions for implementing rule functionality.
 */
'use strict';

var _ = require('underscore'),
    Class = require('class.extend'),
    DEFAULT_OPTIONS;

DEFAULT_OPTIONS = {
   IndentChar: ' ',
   IndentAmount: 3,
};


function getIndentChar(opt) {
   if (opt === 'tab') {
      return '\t';
   } else if (opt === 'space') {
      return ' ';
   }

   return opt;
}

module.exports = Class.extend({

   init: function(context) {
      var userOpts = (context.options.length ? context.options[0] : {}),
          opts = _.extend({}, DEFAULT_OPTIONS, userOpts);

      this.context = context;
      this.sourceCode = context.getSourceCode();
      this.lines = this.sourceCode.getLines();
      this.indent = opts.IndentAmount;
      this.indentChar = getIndentChar(opts.IndentChar);
   },

   lineIndent: function(lineNumber) {
      var line = this.lines[lineNumber - 1],
          regex = new RegExp('[^ ' + this.indentChar + ']');

      if (line === undefined) {
         throw new Error('Invalid lineNumber ' + lineNumber + ' supplied to lineIndent');
      }

      return line[0] === this.indentChar ? line.match(regex).index : 0;
   },

   lineIndentationMatches: function(lineA, lineB) {
      return this.lineIndent(lineA) === this.lineIndent(lineB);
   },

});
