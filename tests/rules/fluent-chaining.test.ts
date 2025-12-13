/**
 * @fileoverview Enforce spacing for chained calls
 */
import { describe, it } from 'vitest';
import fluentChaining from '../../src/plugin/rules/fluent-chaining.js';
import formatCode from '../code-helper.js';
import { RuleTester } from 'eslint';
import fs from 'fs';
import path from 'path';
import { es6 } from '../rule-testers.js';

interface TestError {
   message: string;
   type: string;
}

interface TestCase {
   code: string;
   errors: TestError[];
   output?: string;
   options?: unknown[];
}

const ruleTester = new RuleTester({
   languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
   },
});

const es6RuleTester = es6();

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// member expression spanning multiple lines
function checkManyLinesError(): TestCase {
   return {
      code: formatCode(
         'a()',
         '',
         '   .b();'
      ),
      errors: [
         {
            message: 'Member expression should not span more than 2 lines',
            type: 'MemberExpression',
         },
      ],
   };
}

// member expression spanning multiple lines with comment
function checkManyLinesCommentError(): TestCase {
   return {
      code: formatCode(
         'a()',
         '',
         '   // this comment should not make this pass',
         '   .b();'
      ),
      errors: [
         {
            message: 'Member expression should not span more than 2 lines',
            type: 'MemberExpression',
         },
      ],
   };
}

// once statement is broken into multiple lines
// each member expression should be on its own line
function checkNewLineError(): TestCase {
   return {
      code: formatCode(
         'a()',
         '   .b().c;'
      ),
      errors: [
         {
            message: 'Identifier "c" should be on a new line',
            type: 'Identifier',
         },
      ],
      output: formatCode(
         'a()',
         '   .b()',
         '   .c;'
      ),
   };
}

function checkAllowMemberExpressionWithArrayAccess(): TestCase {
   return {
      code: formatCode(
         '"https://google.com/#home?greeting=hello"',
         '   .split()[0];'
      ),
      errors: [],
   };
}

function checkNewLineErrorWithTabOption(): TestCase {
   return {
      code: formatCode(
         'a()',
         '\t.b().c;'
      ),
      errors: [
         {
            message: 'Identifier "c" should be on a new line',
            type: 'Identifier',
         },
      ],
      options: [ { IndentChar: 'tab', IndentAmount: 1 } ],
      output: formatCode(
         'a()',
         '\t.b()',
         '\t.c;'
      ),
   };
}

function spacingErrorMessage(identifier: string, indentAmount: number, indentChar: string): TestError {
   return {
      message: 'Expected identifier "' + identifier + '" to be indented ' + indentAmount + ' chars (char: "' + indentChar + '")',
      type: 'Identifier',
   };
}

function checkSpacingError(): TestCase {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 3, ' '),
      ],
      output: formatCode(
         'a()',
         '   .b();'
      ),
   };
}

function checkSpacingErrorWithIndentOption(): TestCase {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 4, ' '),
      ],
      options: [ { IndentAmount: 4 } ],
      output: formatCode(
         'a()',
         '    .b();'
      ),
   };
}

function checkSpacingErrorWithTabOption(): TestCase {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 1, 'tab'),
      ],
      options: [ { IndentAmount: 1, IndentChar: 'tab' } ],
      output: formatCode(
         'a()',
         '\t.b();'
      ),
   };
}

function checkSpacingErrorWhenCallHasFunctionArguments(): TestCase {
   const code = formatCode(
      'previous.then(function(val) {',
      '   return val.something;',
      '})',
      '.then(function(something) {',
      '   return something.else;',
      '});'
   );

   return {
      code: code,
      errors: [
         spacingErrorMessage('then', 3, ' '),
      ],
   };
}

function checkSpacingErrorWhenNested(): TestCase {
   return {
      code: formatCode(
         '_.reduce(workQueue, function(previous, toCheck) {',
         '   return previous',
         '   .then(function(val) {',
         '      return val.something;',
         '   })',
         '   .then(function(something) {',
         '      return something.else;',
         '   });',
         '}, Q());'
      ),
      errors: [
         spacingErrorMessage('then', 6, ' '),
         spacingErrorMessage('then', 6, ' '),
      ],
   };
}

function checkSpacingErrorWhenFunctionIsAwaited(): TestCase {
   return {
      code: formatCode(
         '(async () => {',
         '   (await doSomething({',
         '      prop: true',
         '   }))',
         '      .exec();',
         '})'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('exec', 'AwaitExpression'),
      ],
   };
}

function chainingIndentationMatchErrorMessage(identifier: string, objectType: string): TestError {
   return {
      message: `Expected identifier "${identifier}" to align with preceding ${objectType}`,
      type: 'Identifier',
   };
}

function checkOptionalChaining(): TestCase {
   return {
      code: formatCode(
         'obj?.prop?.method();'
      ),
      errors: [],
   };
}

function checkTemplateLiteralAsObject(): TestCase {
   return {
      code: formatCode(
         '`template`',
         '.toUpperCase();' // wrong indentation - should be indented
      ),
      errors: [
         spacingErrorMessage('toUpperCase', 3, ' '),
      ],
      output: formatCode(
         '`template`',
         '   .toUpperCase();'
      ),
   };
}

function checkNumericLiteralAsObject(): TestCase {
   return {
      code: formatCode(
         '123',
         '.toString();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('toString', 3, ' '),
      ],
      output: formatCode(
         '123',
         '   .toString();'
      ),
   };
}

function checkParenthesizedExpression(): TestCase {
   return {
      code: formatCode(
         '(a + b)',
         '.toString();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('toString', 3, ' '),
      ],
      output: formatCode(
         '(a + b)',
         '   .toString();'
      ),
   };
}

function checkComplexArrayAccessor(): TestCase {
   return {
      code: formatCode(
         'arr[0]',
         '.method();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('method', 3, ' '),
      ],
      output: formatCode(
         'arr[0]',
         '   .method();'
      ),
   };
}

function checkComputedProperty(): TestCase {
   return {
      code: formatCode(
         'obj["prop"]',
         '.method();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('method', 3, ' '),
      ],
      output: formatCode(
         'obj["prop"]',
         '   .method();'
      ),
   };
}

function checkVeryLongChain(): TestCase {
   return {
      code: formatCode(
         'promise.then(a).catch(b)',
         '   .finally(c)',
         '   .then(d);'
      ),
      errors: [], // This is actually valid - properly chained on separate lines
   };
}

function checkMixedIndentationInFile(): TestCase {
   return {
      code: formatCode(
         'obj.method()',
         '\t.property;' // mixed tabs and spaces
      ),
      errors: [
         spacingErrorMessage('property', 3, ' '),
      ],
      output: formatCode(
         'obj.method()',
         '   .property;'
      ),
   };
}

function checkUnicodeIdentifier(): TestCase {
   return {
      code: formatCode(
         'obj.méthode()',
         '.propriété;' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('propriété', 3, ' '),
      ],
      output: formatCode(
         'obj.méthode()',
         '   .propriété;'
      ),
   };
}

function checkLongPropertyName(): TestCase {
   return {
      code: formatCode(
         'obj.veryLongPropertyNameThatMightCauseIssues()',
         '.anotherVeryLongPropertyName;' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('anotherVeryLongPropertyName', 3, ' '),
      ],
      output: formatCode(
         'obj.veryLongPropertyNameThatMightCauseIssues()',
         '   .anotherVeryLongPropertyName;'
      ),
   };
}

function checkNestedChainingWithArray(): TestCase {
   return {
      code: formatCode(
         '[1, 2, 3]',
         '.map(x => x * 2);' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('map', 3, ' '),
      ],
      output: formatCode(
         '[1, 2, 3]',
         '   .map(x => x * 2);'
      ),
   };
}

function checkNewExpressionChaining(): TestCase {
   return {
      code: formatCode(
         'new Promise(resolve => resolve(1))',
         '.then(x => x * 2);' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('then', 3, ' '),
      ],
      output: formatCode(
         'new Promise(resolve => resolve(1))',
         '   .then(x => x * 2);'
      ),
   };
}

function checkComplexNestedFunctionCalls(): TestCase {
   return {
      code: formatCode(
         'outer(inner(very.deeply.nested))',
         '.property;' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('property', 3, ' '),
      ],
      output: formatCode(
         'outer(inner(very.deeply.nested))',
         '   .property;'
      ),
   };
}

function checkChainingWithLogicalOperators(): TestCase {
   return {
      code: formatCode(
         '(a && b)',
         '.method();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('method', 3, ' '),
      ],
      output: formatCode(
         '(a && b)',
         '   .method();'
      ),
   };
}

function checkConditionalExpression(): TestCase {
   return {
      code: formatCode(
         '(condition ? a : b)',
         '.method();' // wrong indentation
      ),
      errors: [
         spacingErrorMessage('method', 3, ' '),
      ],
      output: formatCode(
         '(condition ? a : b)',
         '   .method();'
      ),
   };
}

// Successive calls should not be indented at different levels
function checkChainingIndentationError1(): TestCase {
   return {
      code: formatCode(
         'Q.all([',
         '   \'abc\',',
         '   \'def\',',
         '])',
         '   .spread(function(settings, category) {',
         '      return doSomething(settings, category);',
         '   })',
         '   .then(done)',
         '   .done();'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('spread', 'CallExpression'),
      ],
   };
}

// wrong indentation
function checkChainingIndentationError2(): TestCase {
   return {
      code: formatCode(
         'previous.then(function(val) {',
         '   return val.something;',
         '})',
         '   .then(function(something) {',
         '      return something.else;',
         '   });'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('then', 'CallExpression'),
      ],
   };
}

function checkChainingIndentationError3(): TestCase {
   return {
      code: formatCode(
         'new Class({',
         '   prop: true',
         '})',
         '   .exec();'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('exec', 'NewExpression'),
      ],
   };
}

function checkChainingIndentationError4(): TestCase {
   return {
      code: formatCode(
         'new Class({',
         '   items: [',
         '      1,',
         '      2,',
         '   ]',
         '      .filter(isNotNullOrUndefined),',
         '});'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('filter', 'ArrayExpression'),
      ],
   };
}


function checkChainingIndentationError5(): TestCase {
   return {
      code: formatCode(
         'var arr = [',
         '   1,',
         '   2,',
         ']',
         '   .filter(isNotNullOrUndefined);'
      ),
      errors: [
         chainingIndentationMatchErrorMessage('filter', 'ArrayExpression'),
      ],
   };
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('fluent-chaining', () => {
   it('should pass valid cases', () => {
      ruleTester.run('fluent-chaining - valid', fluentChaining, {
         valid: [
            // eslint-disable-next-line no-sync -- Test file read
            fs.readFileSync(path.join(__dirname, '/fluent-chaining.valid.js'), 'utf8'),
         ],
         invalid: [],
      });
   });

   it('should detect many lines error', () => {
      ruleTester.run('fluent-chaining - checkManyLinesError', fluentChaining, {
         valid: [],
         invalid: [ checkManyLinesError() ],
      });
   });

   it('should detect many lines comment error', () => {
      ruleTester.run('fluent-chaining - checkManyLinesCommentError', fluentChaining, {
         valid: [],
         invalid: [ checkManyLinesCommentError() ],
      });
   });

   it('should allow member expression with array access', () => {
      ruleTester.run('fluent-chaining - checkAllowMemberExpressionWithArrayAccess', fluentChaining, {
         valid: [ checkAllowMemberExpressionWithArrayAccess() ],
         invalid: [],
      });
   });

   it('should detect new line error', () => {
      ruleTester.run('fluent-chaining - checkNewLineError', fluentChaining, {
         valid: [],
         invalid: [ checkNewLineError() ],
      });
   });

   it('should detect new line error with tab option', () => {
      ruleTester.run('fluent-chaining - checkNewLineErrorWithTabOption', fluentChaining, {
         valid: [],
         invalid: [ checkNewLineErrorWithTabOption() ],
      });
   });

   it('should detect spacing error', () => {
      ruleTester.run('fluent-chaining - checkSpacingError', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingError() ],
      });
   });

   it('should detect spacing error with indent option', () => {
      ruleTester.run('fluent-chaining - checkSpacingErrorWithIndentOption', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingErrorWithIndentOption() ],
      });
   });

   it('should detect spacing error with tab option', () => {
      ruleTester.run('fluent-chaining - checkSpacingErrorWithTabOption', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingErrorWithTabOption() ],
      });
   });

   it('should detect spacing error when call has function arguments', () => {
      ruleTester.run('fluent-chaining - checkSpacingErrorWhenCallHasFunctionArguments', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingErrorWhenCallHasFunctionArguments() ],
      });
   });

   it('should detect spacing error when nested', () => {
      ruleTester.run('fluent-chaining - checkSpacingErrorWhenNested', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingErrorWhenNested() ],
      });
   });

   it('should detect spacing error when function is awaited', () => {
      es6RuleTester.run('fluent-chaining - checkSpacingErrorWhenFunctionIsAwaited', fluentChaining, {
         valid: [],
         invalid: [ checkSpacingErrorWhenFunctionIsAwaited() ],
      });
   });

   it('should detect chaining indentation error 1', () => {
      ruleTester.run('fluent-chaining - checkChainingIndentationError1', fluentChaining, {
         valid: [],
         invalid: [ checkChainingIndentationError1() ],
      });
   });

   it('should detect chaining indentation error 2', () => {
      ruleTester.run('fluent-chaining - checkChainingIndentationError2', fluentChaining, {
         valid: [],
         invalid: [ checkChainingIndentationError2() ],
      });
   });

   it('should detect chaining indentation error 3', () => {
      ruleTester.run('fluent-chaining - checkChainingIndentationError3', fluentChaining, {
         valid: [],
         invalid: [ checkChainingIndentationError3() ],
      });
   });

   it('should detect chaining indentation error 4', () => {
      ruleTester.run('fluent-chaining - checkChainingIndentationError4', fluentChaining, {
         valid: [],
         invalid: [ checkChainingIndentationError4() ],
      });
   });

   it('should detect chaining indentation error 5', () => {
      ruleTester.run('fluent-chaining - checkChainingIndentationError5', fluentChaining, {
         valid: [],
         invalid: [ checkChainingIndentationError5() ],
      });
   });

   // Additional test cases for edge cases and fixer robustness
   it('should handle optional chaining', () => {
      ruleTester.run('fluent-chaining - optional chaining', fluentChaining, {
         valid: [ checkOptionalChaining() ],
         invalid: [],
      });
   });

   it('should detect template literal as object error', () => {
      ruleTester.run('fluent-chaining - template literal as object', fluentChaining, {
         valid: [],
         invalid: [ checkTemplateLiteralAsObject() ],
      });
   });

   it('should detect numeric literal as object error', () => {
      ruleTester.run('fluent-chaining - numeric literal as object', fluentChaining, {
         valid: [],
         invalid: [ checkNumericLiteralAsObject() ],
      });
   });

   it('should detect parenthesized expression error', () => {
      ruleTester.run('fluent-chaining - parenthesized expression', fluentChaining, {
         valid: [],
         invalid: [ checkParenthesizedExpression() ],
      });
   });

   it('should detect complex array accessor error', () => {
      ruleTester.run('fluent-chaining - complex array accessor', fluentChaining, {
         valid: [],
         invalid: [ checkComplexArrayAccessor() ],
      });
   });

   it('should detect computed property error', () => {
      ruleTester.run('fluent-chaining - computed property', fluentChaining, {
         valid: [],
         invalid: [ checkComputedProperty() ],
      });
   });

   it('should handle very long chain', () => {
      ruleTester.run('fluent-chaining - very long chain', fluentChaining, {
         valid: [ checkVeryLongChain() ],
         invalid: [],
      });
   });

   it('should detect mixed indentation error', () => {
      ruleTester.run('fluent-chaining - mixed indentation', fluentChaining, {
         valid: [],
         invalid: [ checkMixedIndentationInFile() ],
      });
   });

   it('should detect unicode identifier error', () => {
      ruleTester.run('fluent-chaining - unicode identifier', fluentChaining, {
         valid: [],
         invalid: [ checkUnicodeIdentifier() ],
      });
   });

   it('should detect long property name error', () => {
      ruleTester.run('fluent-chaining - long property name', fluentChaining, {
         valid: [],
         invalid: [ checkLongPropertyName() ],
      });
   });

   it('should detect nested chaining with array error', () => {
      ruleTester.run('fluent-chaining - nested chaining with array', fluentChaining, {
         valid: [],
         invalid: [ checkNestedChainingWithArray() ],
      });
   });

   it('should detect new expression chaining error', () => {
      ruleTester.run('fluent-chaining - new expression chaining', fluentChaining, {
         valid: [],
         invalid: [ checkNewExpressionChaining() ],
      });
   });

   it('should detect complex nested function calls error', () => {
      ruleTester.run('fluent-chaining - complex nested function calls', fluentChaining, {
         valid: [],
         invalid: [ checkComplexNestedFunctionCalls() ],
      });
   });

   it('should detect chaining with logical operators error', () => {
      ruleTester.run('fluent-chaining - chaining with logical operators', fluentChaining, {
         valid: [],
         invalid: [ checkChainingWithLogicalOperators() ],
      });
   });

   it('should detect conditional expression error', () => {
      ruleTester.run('fluent-chaining - conditional expression', fluentChaining, {
         valid: [],
         invalid: [ checkConditionalExpression() ],
      });
   });
});
