/**
 * This file contains the default linting configuration for JS code wherever it may
 * appear. Separately, there are rulesets like node, browser, and node-test, each for
 * their respective environments.
 *
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const getVueRules = require('./partials/vue').getVueRules;


module.exports = {

   'extends': 'eslint:recommended',

   // ESLint by default ignores directories with dot prefixes. Some of our projects use
   // VuePress which maintains its source code in a `.vuepress` directory. This negated
   // ignore pattern enables linting for any projects using our config.
   'ignorePatterns': [ '!.vuepress' ],

   'plugins': [
      '@silvermine/eslint-plugin-silvermine', // Our custom rules
      '@typescript-eslint', // TypeScript-specific rules
      'import', // dependency import linting plugin via eslint-plugin-import
      'vue', // Vue-specific rules
   ],

   // Settings for eslint-plugin-import
   'settings': {
      'import/parsers': {
         '@typescript-eslint/parser': [ '.ts' ],
      },
      'import/resolver': {
         'typescript': true,
         'node': true,
      },
   },

   'parserOptions': {
      // Setting the ecmaVersion to 2019 allows ESLint to parse any file that has valid
      // syntax, even if we use things like spread and rest syntax. It would be nice to
      // set this to something like 'latest', but you must specify a specific version.
      'ecmaVersion': 2019,
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
      '@silvermine/silvermine/no-multiline-var-declarations': [ 'error', { 'const': 'single-only' } ],
      '@silvermine/silvermine/empty-object-spacing': 'error',
      '@silvermine/silvermine/empty-array-spacing': 'error',
      '@silvermine/silvermine/uninitialized-last': 'error',
      '@silvermine/silvermine/block-scope-case': 'error',
      '@silvermine/silvermine/brace-style': [ 'error', '1tbs', { 'allowSingleLine': false, 'allowSingleLineArrow': true } ],
      '@silvermine/silvermine/max-statements-per-line': 'error',

      'import/newline-after-import': [ 'error' ],
      'import/no-cycle': [ 'warn' ],
      'import/no-duplicates': [ 'error' ],
      'import/no-extraneous-dependencies': [ 'error', { packageDir: [ './' ] } ],
      'import/no-mutable-exports': [ 'error' ],
      'import/no-useless-path-segments': [ 'error' ],

      'indent': [ 'error', 3, { 'VariableDeclarator': 'first', 'SwitchCase': 1 } ],
      'comma-dangle': [
         'error',
         {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
         },
      ],
      'no-unsafe-finally': 'warn',

      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'complexity': 'error',
      'curly': 'error',
      'default-case': 'error',
      'default-param-last': 'error',
      'dot-location': [ 'error', 'property' ],
      'dot-notation': [
         'error',
         { 'allowPattern': '^[a-z]+(_[a-z]+)+$' }, // Allow obj['snake_case']
      ],
      'eqeqeq': 'error',
      'grouped-accessor-pairs': [ 'error', 'getBeforeSet' ],
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-console': 'error',
      'no-constructor-return': 'error',
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
      'no-implicit-globals': [ 'error', { 'lexicalBindings': true } ],
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
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

      'no-shadow': 'error',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-restricted-globals': [ 'error', 'event' ],
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': 'error',
      'no-use-before-define': [ 'error', { 'functions': false } ],

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
            'ignorePattern': '^\\s*((async|export|default|async|public|private|protected|function) )+.*\\{', // function declaration lines
         },
      ],
      'max-nested-callbacks': [ 'error', 6 ],
      'max-params': [ 'error', 5 ],
      'new-cap': [
         'error',
         { 'capIsNewExceptions': [ 'Q' ] },
      ],
      'new-parens': 'error',
      'padding-line-between-statements': [
         'error',
         { blankLine: 'always', prev: [ 'var', 'let', 'const' ], next: '*' },
      ],
      'prefer-regex-literals': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-import-assign': 'error',
      'no-dupe-else-if': 'error',
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
         'WithStatement',
         'YieldExpression',
      ],
      'no-setter-return': 'error',
      'func-call-spacing': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': [ 'error', 'always' ],
      'one-var': [ 'error', { 'var': 'always', 'let': 'consecutive' } ],
      'one-var-declaration-per-line': 'error',
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'always' ],
      'semi-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': [
         'error',
         {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
         },
      ],
      'space-in-parens': [ 'error', 'never' ],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'unicode-bom': 'error',

      'arrow-body-style': [ 'error', 'always' ],
      'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
      'arrow-parens': 'error',

      'template-curly-spacing': [ 'error', 'never' ],
      'object-property-newline': [ 'error', { 'allowAllPropertiesOnSameLine': true } ],

   },

   'overrides': [
      {
         'files': [ '*.cjs' ],
      },
      {
         'files': [ '*.ts' ],
         'parser': '@typescript-eslint/parser',
         'parserOptions': {
            'sourceType': 'module',
            // Disable warning banner for possibly incompatible versions of TypeScript
            'loggerFn': false,
         },
         'rules': {
            // The standard ESLint `no-dupe-class-members` rule will report false
            // positives for overloaded TypeScript class methods. This rule is safe to
            // disable because actual duplicate class members will be caught by the
            // TypeScript compiler.
            'no-dupe-class-members': 'off',
            // TODO: figure out how to fix no-undef.
            // Currently, no-undef causes false positives for TypeScript class properties.
            // With TypeScript-only code this rule can safely be disabled because
            // TypeScript won't compile if the definition is missing. However, if we use
            // any JavaScript in the project we need to have it enabled.
            'no-undef': 'off',
            // The standard ESLint `no-unused-vars' rule will throw false positives with
            // class properties in TypeScript. The TypeScript-specific rule fixes this.
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            // For TypeScript code, `const`/`let` should be used exclusively
            'no-var': 'error',
            // new-cap throws errors with property decorators
            'new-cap': 'off',

            // TypeScript will be parsed in strict mode and output the `use-strict`
            // directive for the transpiled JavaScript automatically.
            'strict': [ 'error', 'never' ],

            'no-empty-function': [ 'error', { 'allow': [ 'constructors' ] } ],

            '@typescript-eslint/adjacent-overload-signatures': 'error',

            // Disable ESLint's camelcase so we can override with our own
            // naming convention rules.
            'camelcase': 'off',

            '@typescript-eslint/naming-convention': [
               'error',
               {
                  selector: 'classProperty',
                  modifiers: [ 'private' ],
                  format: [ 'camelCase' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'protected' ],
                  format: [ 'camelCase' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'private', 'static' ],
                  format: [ 'snake_case' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'private', 'readonly', 'static' ],
                  format: [ 'UPPER_CASE' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'protected', 'readonly', 'static' ],
                  format: [ 'UPPER_CASE' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'public', 'readonly', 'static' ],
                  format: [ 'UPPER_CASE' ],
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'protected', 'static' ],
                  format: [ 'snake_case' ],
                  leadingUnderscore: 'require',
               },
               {
                  selector: 'classProperty',
                  modifiers: [ 'public', 'static' ],
                  format: [ 'snake_case' ],
                  leadingUnderscore: 'forbid',
               },
               {
                  selector: 'enum',
                  format: [ 'PascalCase' ],
               },
               {
                  selector: 'typeLike',
                  format: [ 'PascalCase' ],
               },
               {
                  selector: 'variable',
                  format: [ 'camelCase', 'PascalCase' ],
               },
               {
                  selector: 'parameter',
                  format: [ 'camelCase', 'PascalCase' ],
                  leadingUnderscore: 'allow',
               },
               {
                  selector: 'variable',
                  modifiers: [ 'global' ],
                  format: [ 'UPPER_CASE', 'camelCase', 'PascalCase' ],
               },
            ],
            // no-shadow is incompatible with TypeScript code.
            // @typescript-eslint/no-shadow replaces it.
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'error',
            // no-redeclare is incompatible with TypeScript code.
            // @typescript-eslint/no-redeclare replaces it.
            'no-redeclare': 'off',
            '@typescript-eslint/no-redeclare': [ 'error' ],
            '@typescript-eslint/explicit-function-return-type': [ 'error', { 'allowExpressions': true } ],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/member-delimiter-style': 'error',
            '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'as' } ],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/member-ordering': [
               'error',
               {
                  'default': [
                     // Index signature
                     'signature',
                     'call-signature',

                     // Fields
                     'public-static-field',
                     'protected-static-field',
                     'private-static-field',

                     'public-instance-field',
                     'protected-instance-field',
                     'private-instance-field',

                     'public-abstract-field',
                     'protected-abstract-field',

                     'public-field',
                     'protected-field',
                     'private-field',

                     'static-field',
                     'instance-field',
                     'abstract-field',

                     'field',

                     // Constructors
                     'public-constructor',
                     'protected-constructor',
                     'private-constructor',

                     'constructor',

                     // Methods
                     [ 'public-static-method', 'public-static-get', 'public-static-set' ],
                     [ 'protected-static-method', 'protected-static-get', 'protected-static-set' ],
                     [ 'private-static-method', 'private-static-get', 'private-static-set' ],

                     [ 'public-instance-method', 'public-instance-get', 'public-instance-set' ],
                     [ 'protected-instance-method', 'protected-instance-get', 'protected-instance-set' ],
                     [ 'private-instance-method', 'private-instance-get', 'private-instance-set' ],

                     [ 'public-abstract-method', 'public-abstract-get', 'public-abstract-set' ],
                     [ 'protected-abstract-method', 'protected-abstract-get', 'protected-abstract-set' ],

                     'public-method',
                     'protected-method',
                     'private-method',

                     [ 'static-method', 'static-get', 'static-set' ],
                     [ 'instance-method', 'instance-get', 'instance-set' ],
                     [ 'abstract-method', 'abstract-get', 'abstract-set' ],

                     'method',
                  ],
               },
            ],
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-parameter-properties': [ 'error', { 'allows': [ 'private' ] } ],
            '@typescript-eslint/triple-slash-reference': [ 'error', { 'path': 'never', 'types': 'never', 'lib': 'never' } ],
            '@typescript-eslint/type-annotation-spacing': [
               'error',
               {
                  'before': false,
                  'after': true,
                  'overrides': {
                     'arrow': { 'before': true, 'after': true },
                  },
               },
            ],
            '@typescript-eslint/no-empty-interface': 'error',

            // Turn off the core no-use-before-define to avoid double reporting errors.
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': [
               'error',
               {
                  'functions': false,
                  'typedefs': false,
               },
            ],
         },
      },
      {
         'files': [ '*.d.ts' ],

         'rules': {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
         },
      },
      {
         files: [ '**/*.vue' ],
         parser: 'vue-eslint-parser',
         parserOptions: {
            parser: '@typescript-eslint/parser',
            ecmaVersion: 2020,
            sourceType: 'module',
         },
         env: {
            'vue/setup-compiler-macros': true,
            browser: true,
         },
         rules: getVueRules(3),
      },
   ],
};
