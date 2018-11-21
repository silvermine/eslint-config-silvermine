/**
 * This file contains the default linting configuration for JS code wherever it may
 * appear. Separately, there are rulesets like node, browser, and node-test, each for
 * their respective environments.
 *
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {

   'extends': 'eslint:recommended',

   'plugins': [
      '@silvermine/eslint-plugin-silvermine', // Our custom rules
      'typescript', // TypeScript-specific rules
   ],

   'parserOptions': {
      // Setting the ecmaVersion to 2018 allows ESLint to parse any file that has valid
      // syntax, even if we use things like spread and rest syntax. It would be nice to
      // set this to something like 'latest', but you must specify a specific version.
      'ecmaVersion': 2018,
   },

   'env': {
      'es6': true,
   },

   'rules': {

      '@silvermine/silvermine/array-indentation': 'error',
      '@silvermine/silvermine/call-indentation': 'error',
      '@silvermine/silvermine/fluent-chaining': 'error',
      '@silvermine/silvermine/no-multiple-inline-functions': 'error',
      '@silvermine/silvermine/no-multiline-conditionals': 'error',
      '@silvermine/silvermine/no-multiline-var-declarations': 'error',
      '@silvermine/silvermine/indent': [ 'error', 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      '@silvermine/silvermine/empty-object-spacing': 'error',
      '@silvermine/silvermine/empty-array-spacing': 'error',
      '@silvermine/silvermine/uninitialized-last': 'error',

      'comma-dangle': [ 'error', 'always-multiline' ],
      'no-unsafe-finally': 'warn',

      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'complexity': 'error',
      'curly': 'error',
      'default-case': 'error',
      'dot-location': [ 'error', 'property' ],
      'dot-notation': 'error',
      'eqeqeq': 'error',
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-empty-pattern': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-floating-decimal': 'error',
      'no-implicit-coercion': [ 'error', { 'allow': [ '!!' ] } ],
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-native-reassign': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'radix': 'error',
      'vars-on-top': 'error',
      'wrap-iife': 'error',
      'yoda': 'error',

      'strict': 'error',

      'no-catch-shadow': 'error',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-restricted-globals': [ 'error', 'event' ],
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': 'error',
      'no-use-before-define': 'error',

      'callback-return': [ 'error', [ 'callback', 'cb', 'next', 'done' ] ],
      'global-require': 'error',
      'handle-callback-err': 'error',
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-env': 'error',
      'no-process-exit': 'error',
      'no-sync': 'error',

      'array-bracket-spacing': [ 'error', 'always' ],
      'block-spacing': 'error',
      'brace-style': 'error',
      'camelcase': 'error',
      'comma-spacing': 'error',
      'comma-style': 'error',
      'computed-property-spacing': 'error',
      'consistent-this': [ 'error', 'self' ],
      'eol-last': 'error',
      'key-spacing': 'error',
      'keyword-spacing': [
         'error',
         {
            'overrides': {
               'catch': { 'after': false },
            },
         },
      ],
      'linebreak-style': [ 'error', 'unix' ],
      'lines-around-comment': 'error',
      'spaced-comment': [ 'error', 'always' ],
      'max-depth': [ 'error', 4 ],
      'max-len': [
         'error',
         {
            'code': 140,
            'comments': 90,
            'ignoreUrls': true,
         },
      ],
      'max-nested-callbacks': [ 'error', 6 ],
      'max-params': [ 'error', 5 ],
      'max-statements-per-line': 'error',
      'new-cap': [
         'error',
         { 'capIsNewExceptions': [ 'Q' ] },
      ],
      'new-parens': 'error',
      'newline-after-var': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-lonely-if': 'error',
      'no-multiple-empty-lines': [
         'error',
         {
            'max': 2,
            'maxBOF': 0,
            'maxEOF': 0,
         },
      ],
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new-object': 'error',
      'no-plusplus': [
         'error',
         { 'allowForLoopAfterthoughts': true },
      ],
      'no-restricted-syntax': [
         'error',
         'DoWhileStatement',
         'DebuggerStatement',
         'EmptyStatement',
         'ForInStatement',
         'JSXIdentifier',
         'JSXNamespacedName',
         'JSXMemberExpression',
         'JSXEmptyExpression',
         'JSXExpressionContainer',
         'JSXElement',
         'JSXClosingElement',
         'JSXOpeningElement',
         'JSXAttribute',
         'JSXSpreadAttribute',
         'JSXText',
         'WithStatement',
         'YieldExpression',
      ],
      'no-spaced-func': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': [ 'error', 'always' ],
      'one-var': [ 'error', { 'var': 'always', 'let': 'consecutive' } ],
      'one-var-declaration-per-line': 'error',
      'quote-props': [ 'error', 'as-needed', { 'keywords': true, 'unnecessary': false } ],
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'always' ],
      'semi-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': [ 'error', 'never' ],
      'space-in-parens': [ 'error', 'never' ],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'unicode-bom': 'error',

      'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
      'arrow-parens': 'error',

      'prefer-template': 'error',
      'template-curly-spacing': [ 'error', 'never' ],
   },

   'overrides': [
      {
         'files': [ '*.ts' ],
         'parser': 'typescript-eslint-parser',
         'parserOptions': {
            'sourceType': 'module',
            // Disable warning banner for possibly incompatible versions of TypeScript
            'loggerFn': false,
         },
         'rules': {
            // TODO: figure out how to fix no-undef.
            // Currently, no-undef causes false positives for TypeScript class properties.
            // With TypeScript-only code this rule can safely be disabled because
            // TypeScript won't compile if the definition is missing. However, if we use
            // any JavaScript in the project we need to have it enabled.
            'no-undef': 'off',
            // The standard ESLint `no-unused-vars' rule will throw false positives with
            // class properties in TypeScript. The TypeScript-specific rule fixes this.
            'typescript/no-unused-vars': 'error',
            'no-unused-vars': 'off',
            // new-cap throws errors with property decorators
            'new-cap': 'off',

            'no-empty-function': [ 'error', { 'allow': [ 'constructors' ] } ],

            'typescript/adjacent-overload-signatures': 'error',
            'typescript/class-name-casing': 'error',
            'typescript/explicit-function-return-type': 'error',
            'typescript/explicit-member-accessibility': 'error',
            'typescript/member-delimiter-style': 'error',
            'typescript/no-angle-bracket-type-assertion': 'error',
            'typescript/no-array-constructor': 'error',
            'typescript/no-namespace': 'error',
            'typescript/member-naming': [ 'error', { 'private': '^_', 'protected': '^_' } ],
            'typescript/member-ordering': 'error',
            'typescript/no-non-null-assertion': 'error',
            'typescript/no-parameter-properties': [ 'error', { 'allows': [ 'private' ] } ],
            'typescript/no-triple-slash-reference': 'error',
            'typescript/type-annotation-spacing': [
               'error',
               {
                  'before': false,
                  'after': true,
                  'overrides': {
                     'arrow': { 'before': true, 'after': true },
                  },
               },
            ],
         },
      },
   ],
};
