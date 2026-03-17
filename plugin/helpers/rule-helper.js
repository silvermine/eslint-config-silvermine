'use strict';

var DEFAULT_OPTIONS;

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

class RuleHelper {

   constructor(context) {
      var userOpts = (context.options.length ? context.options[0] : {}),
          opts = { ...DEFAULT_OPTIONS, ...userOpts };

      this.context = context;
      this.sourceCode = context.sourceCode;
      this.lines = this.sourceCode.getLines();
      this.indent = opts.IndentAmount;
      this.indentChar = getIndentChar(opts.IndentChar);
   }

   lineIndent(lineNumber) {
      var line = this.lines[lineNumber - 1],
          regex = new RegExp('[^ ' + this.indentChar + ']');

      if (line === undefined) {
         throw new Error('Invalid lineNumber ' + lineNumber + ' supplied to lineIndent');
      }

      return line[0] === this.indentChar ? line.match(regex).index : 0;
   }

   lineIndentationMatches(lineA, lineB) {
      return this.lineIndent(lineA) === this.lineIndent(lineB);
   }

}

module.exports = RuleHelper;
