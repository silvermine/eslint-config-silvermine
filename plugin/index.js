/**
 * @fileoverview Shareable eslint plugin for use by @silvermine/eslint-config
 */

'use strict';

var fluentChaining = require('./rules/fluent-chaining'),
    arrayIndentation = require('./rules/array-indentation'),
    callIndentation = require('./rules/call-indentation'),
    noMultipleInlineFunctions = require('./rules/no-multiple-inline-functions'),
    noMultilineVarDeclaration = require('./rules/no-multiline-var-declaration'),
    noMultilineConditionals = require('./rules/no-multiline-conditionals'),
    emptyObjectSpacing = require('./rules/empty-object-spacing'),
    emptyArraySpacing = require('./rules/empty-array-spacing'),
    uninitializedLast = require('./rules/uninitialized-last'),
    noArrowProperties = require('./rules/no-arrow-for-class-property'),
    modulesOnly = require('./rules/module-files-only'),
    blockScopeCase = require('./rules/block-scope-case'),
    braceStyle = require('./rules/brace-style'),
    maxStatementsPerLine = require('./rules/max-statements-per-line');

module.exports.rules = {
   'fluent-chaining': fluentChaining,
   'array-indentation': arrayIndentation,
   'call-indentation': callIndentation,
   'no-multiple-inline-functions': noMultipleInlineFunctions,
   'no-multiline-var-declarations': noMultilineVarDeclaration,
   'brace-style': braceStyle,
   'no-multiline-conditionals': noMultilineConditionals,
   'empty-object-spacing': emptyObjectSpacing,
   'empty-array-spacing': emptyArraySpacing,
   'uninitialized-last': uninitializedLast,
   'no-arrow-for-class-property': noArrowProperties,
   'module-files-only': modulesOnly,
   'block-scope-case': blockScopeCase,
   'max-statements-per-line': maxStatementsPerLine,
};
