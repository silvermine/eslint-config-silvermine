/**
 * @fileoverview Shareable eslint plugin for use by eslint-config-silvermine
 */

'use strict';

var fluentChaining = require('./rules/fluent-chaining'),
    arrayIndentation = require('./rules/array-indentation'),
    callIndentation = require('./rules/call-indentation'),
    noMultipleInlineFunctions = require('./rules/no-multiple-inline-functions');

module.exports.rules = {
   'fluent-chaining': fluentChaining,
   'array-indentation': arrayIndentation,
   'call-indentation': callIndentation,
   'no-multiple-inline-functions': noMultipleInlineFunctions,
};
