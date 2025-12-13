/**
 * @fileoverview Shareable eslint plugin for use by @silvermine/eslint-config
 */
import type { ESLint } from 'eslint';
import fluentChaining from './rules/fluent-chaining.js';
import arrayIndentation from './rules/array-indentation.js';
import callIndentation from './rules/call-indentation.js';
import noMultipleInlineFunctions from './rules/no-multiple-inline-functions.js';
import noMultilineVarDeclaration from './rules/no-multiline-var-declaration.js';
import noMultilineConditionals from './rules/no-multiline-conditionals.js';
import emptyObjectSpacing from './rules/empty-object-spacing.js';
import emptyArraySpacing from './rules/empty-array-spacing.js';
import uninitializedLast from './rules/uninitialized-last.js';
import noArrowProperties from './rules/no-arrow-for-class-property.js';
import modulesOnly from './rules/module-files-only.js';
import blockScopeCase from './rules/block-scope-case.js';
import braceStyle from './rules/brace-style.js';
import maxStatementsPerLine from './rules/max-statements-per-line.js';
import _package from '../../package.json' with { type: 'json' };

const plugin: ESLint.Plugin = {
   meta: {
      name: '@silvermine/eslint-plugin-silvermine',
      version: _package.version,
   },
   rules: {
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
   },
};

export default plugin;
