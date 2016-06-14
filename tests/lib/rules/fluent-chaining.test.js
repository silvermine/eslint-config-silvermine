/**
 * @fileoverview Enforce spacing for chained calls
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fluentChaining = require('../../../lib/rules/fluent-chaining'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    fs = require('fs'),
    path = require('path'),
    ruleTester = new RuleTester();

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

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
            type: 'MemberExpression'
         }
      ]
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
            type: 'Identifier'
         }
      ],
      output: formatCode(
         'a()',
         '   .b()',
         '   .c;'
      )
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
            type: 'Identifier'
         }
      ],
      options: [ { IndentChar: 'tab', IndentAmount: 1 } ],
      output: formatCode(
         'a()',
         '\t.b()',
         '\t.c;'
      )
   };
}

function spacingErrorMessage(identifier, indentAmount, indentChar) {
   return {
      message: 'Expected identifier "' + identifier + '" to be indented ' + indentAmount + ' chars (char: "' + indentChar + '")',
      type: 'Identifier'
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
      )
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
      )
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
      )
   };
}

function checkSpacingErrorWhenCallHasFunctionArguments() {
   var code = formatCode(
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
      output: code // output should be unchanged
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
      ]
   };
}

function chainingIndentationMatchErrorMessage() {
   return {
      message: 'Call expression should be on a new line and indented',
      type: 'CallExpression'
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
         chainingIndentationMatchErrorMessage(),
      ]
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
         chainingIndentationMatchErrorMessage(),
      ]
   };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('fluent-chaining - no false-positives for valid code', fluentChaining, {
   valid: [
      fs.readFileSync(path.join(__dirname, '/fluent-chaining.valid.js'), 'utf8') // eslint-disable-line no-sync
   ],
   invalid: [],
});

ruleTester.run('fluent-chaining - checkManyLinesError', fluentChaining, {
   valid: [],
   invalid: [ checkManyLinesError() ],
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

ruleTester.run('fluent-chaining - checkChainingIndentationError1', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError1() ],
});

ruleTester.run('fluent-chaining - checkChainingIndentationError2', fluentChaining, {
   valid: [],
   invalid: [ checkChainingIndentationError2() ],
});
