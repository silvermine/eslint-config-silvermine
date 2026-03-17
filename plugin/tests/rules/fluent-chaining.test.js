/**
 * @fileoverview Enforce spacing for chained calls
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var fluentChaining = require('../../rules/fluent-chaining'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    fs = require('fs'),
    path = require('path'),
    ruleTester = new RuleTester(),
    es6RuleTester = require('../ruleTesters').es6();

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// member expression spanning multiple lines
function checkManyLinesError() {
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
function checkManyLinesCommentError() {
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
function checkNewLineError() {
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

function checkAllowMemberExpressionWithArrayAccess() {
   return {
      code: formatCode(
         '"https://google.com/#home?greeting=hello"',
         '   .split()[0];'
      ),
      errors: [],
      output: [
         formatCode(
            '"https://google.com/#home?greeting=hello"',
            '   .split()[0];'
         ),
      ],
   };
}

function checkNewLineErrorWithTabOption() {
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

function spacingErrorMessage(identifier, indentAmount, indentChar) {
   return {
      message: 'Expected identifier "' + identifier + '" to be indented ' + indentAmount + ' chars (char: "' + indentChar + '")',
      type: 'Identifier',
   };
}

function checkSpacingError() {
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

function checkSpacingErrorWithIndentOption() {
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

function checkSpacingErrorWithTabOption() {
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

function checkSpacingErrorWhenCallHasFunctionArguments() {
   var code;

   code = formatCode(
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
      output: code, // output should be unchanged
   };
}

function checkSpacingErrorWhenNested() {
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

function checkSpacingErrorWhenFunctionIsAwaited() {
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

function chainingIndentationMatchErrorMessage(identifier, objectType) {
   return {
      message: 'Expected identifier "' + identifier + '" to align with preceding ' + objectType,
      type: 'Identifier',
   };
}

// Successive calls should not be indented at different levels
function checkChainingIndentationError1() {
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
function checkChainingIndentationError2() {
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

function checkChainingIndentationError3() {
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

function checkChainingIndentationError4() {
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


function checkChainingIndentationError5() {
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

ruleTester.run('fluent-chaining - no false-positives for valid code', fluentChaining, {
   valid: [
      fs.readFileSync(path.join(__dirname, '/fluent-chaining.valid.js'), 'utf8'), // eslint-disable-line no-sync
   ],
   invalid: [],
});

ruleTester.run('fluent-chaining - checkManyLinesError', fluentChaining, {
   valid: [],
   invalid: [ checkManyLinesError() ],
});

ruleTester.run('fluent-chaining - checkManyLinesError', fluentChaining, {
   valid: [],
   invalid: [ checkManyLinesCommentError() ],
});

ruleTester.run('fluent-chaning - checkAllowMemberExpressionWithArrayAccess', fluentChaining, {
   valid: [ checkAllowMemberExpressionWithArrayAccess() ],
   invalid: [],
});

ruleTester.run('fluent-chaining - checkNewLineError', fluentChaining, {
   valid: [],
   invalid: [ checkNewLineError() ],
});

ruleTester.run('fluent-chaining - checkNewLineErrorWithTabOption', fluentChaining, {
   valid: [],
   invalid: [ checkNewLineErrorWithTabOption() ],
});

ruleTester.run('fluent-chaining - checkSpacingError', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingError() ],
});

ruleTester.run('fluent-chaining - checkSpacingErrorWithIndentOption', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingErrorWithIndentOption() ],
});

ruleTester.run('fluent-chaining - checkSpacingErrorWithTabOption', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingErrorWithTabOption() ],
});

ruleTester.run('fluent-chaining - checkSpacingErrorWhenCallHasFunctionArguments', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingErrorWhenCallHasFunctionArguments() ],
});

ruleTester.run('fluent-chaining - checkSpacingErrorWhenNested', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingErrorWhenNested() ],
});

es6RuleTester.run('fluent-chaining - checkSpacingErrorWhenFunctionIsAwaited', fluentChaining, {
   valid: [],
   invalid: [ checkSpacingErrorWhenFunctionIsAwaited() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError1', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError1() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError2', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError2() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError3', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError3() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError4', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError4() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError5', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError5() ],
});
