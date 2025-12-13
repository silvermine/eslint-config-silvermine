/**
 * @fileoverview Helper functions for implementing rule functionality.
 */
import type { SourceCode, Rule } from 'eslint';

export { Rule };

/**
 * Options for rule helper configuration.
 */
export interface RuleHelperOptions {
   IndentChar?: 'space' | 'tab';
   IndentAmount?: number;
}

const DEFAULT_OPTIONS: Required<RuleHelperOptions> = {
   IndentChar: 'space',
   IndentAmount: 3,
};

function getIndentChar(opt: RuleHelperOptions['IndentChar']): string {
   if (opt === 'tab') {
      return '\t';
   }
   return ' ';
}

export default class RuleHelper {

   public readonly context: Rule.RuleContext;
   public readonly sourceCode: SourceCode;
   public readonly lines: string[];
   public readonly indent: number;
   public readonly indentChar: string;

   private readonly _nonIndentCharRegex: RegExp;

   public constructor(context: Rule.RuleContext) {
      const userOpts = (context.options.length ? context.options[0] : {}) as RuleHelperOptions,
            opts: Required<RuleHelperOptions> = { ...DEFAULT_OPTIONS, ...userOpts };

      this.context = context;
      this.sourceCode = context.sourceCode;
      this.lines = this.sourceCode.getLines();
      this.indent = opts.IndentAmount;
      this.indentChar = getIndentChar(opts.IndentChar);
      this._nonIndentCharRegex = new RegExp('[^ ' + this.indentChar + ']');
   }

   public lineIndent(lineNumber: number): number {
      const line = this.lines[lineNumber - 1];

      if (line === undefined) {
         throw new Error('Invalid lineNumber ' + lineNumber + ' supplied to lineIndent');
      }

      const match = line.match(this._nonIndentCharRegex);

      return line[0] === this.indentChar && match ? match.index ?? 0 : 0;
   }

   public lineIndentationMatches(lineA: number, lineB: number): boolean {
      return this.lineIndent(lineA) === this.lineIndent(lineB);
   }

}
