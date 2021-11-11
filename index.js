/**
 * This file contains the default linting configuration for JS code wherever it may
 * appear. Separately, there are rulesets like node, browser, and node-test, each for
 * their respective environments.
 *
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const vueRulesBase = require('eslint-plugin-vue/lib/configs/base').rules,
      vueRulesEssentials = require('eslint-plugin-vue/lib/configs/essential').rules,
      vue3RulesEssentials = require('eslint-plugin-vue/lib/configs/vue3-essential').rules,
      vueRulesStronglyRecommended = require('eslint-plugin-vue/lib/configs/strongly-recommended').rules,
      vue3RulesStronglyRecommended = require('eslint-plugin-vue/lib/configs/vue3-strongly-recommended').rules,
      vueRulesRecommended = require('eslint-plugin-vue/lib/configs/recommended').rules,
      vue3RulesRecommended = require('eslint-plugin-vue/lib/configs/vue3-recommended').rules;


module.exports = {

   'extends': 'eslint:recommended',

   'plugins': [
      '@silvermine/eslint-plugin-silvermine', // Our custom rules
      '@typescript-eslint', // TypeScript-specific rules
      'vue', // Vue-specific rules
   ],

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
      'dot-notation': 'error',
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
            '@typescript-eslint/class-name-casing': 'error',
            '@typescript-eslint/explicit-function-return-type': [ 'error', { 'allowExpressions': true } ],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/member-delimiter-style': 'error',
            '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'as' } ],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/member-naming': [ 'error', { 'private': '^_', 'protected': '^_' } ],
            '@typescript-eslint/member-ordering': 'error',
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

            '@typescript-eslint/no-type-alias': [
               'error',
               {
                  'allowAliases': 'in-unions-and-intersections',
                  'allowCallbacks': 'always',
                  'allowMappedTypes': 'always',
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
            browser: true,
         },
         rules: Object.assign(
            {},
            vueRulesBase,
            vueRulesEssentials,
            vue3RulesEssentials,
            vueRulesStronglyRecommended,
            vue3RulesStronglyRecommended,
            vueRulesRecommended,
            vue3RulesRecommended,
            {
               // The 'no-unused-vars' rules does not work with type definitions in .vue
               // files.
               'no-unused-vars': 'off',

               // Priority B: Strongly Recommended
               'vue/attribute-hyphenation': [ 'error', 'never' ],
               'vue/component-definition-name-casing': [ 'error', 'PascalCase' ],
               'vue/html-closing-bracket-newline': [
                  'error',
                  {
                     'singleline': 'never',
                     'multiline': 'never',
                  },
               ],
               'vue/html-closing-bracket-spacing': [
                  'error',
                  {
                     'startTag': 'never',
                     'endTag': 'never',
                     'selfClosingTag': 'always',
                  },
               ],
               'vue/html-end-tags': 'error',
               'vue/html-indent': [
                  'error',
                  3,
                  {
                     'attribute': 1,
                     'baseIndent': 1,
                     'closeBracket': 0,
                     'alignAttributesVertically': true,
                  },
               ],
               'vue/html-quotes': [ 'error', 'double' ],
               'vue/html-self-closing': 'error',
               'vue/max-attributes-per-line': 'off',
               'vue/multiline-html-element-content-newline': 'error',
               'vue/mustache-interpolation-spacing': 'error',
               'vue/no-multi-spaces': 'error',
               'vue/no-spaces-around-equal-signs-in-attribute': 'error',
               'vue/no-template-shadow': 'error',
               'vue/one-component-per-file': 'error',
               'vue/prop-name-casing': 'error',
               'vue/require-default-prop': 'error',
               'vue/require-prop-types': 'error',
               'vue/singleline-html-element-content-newline': 'off',
               'vue/v-bind-style': 'error',
               'vue/v-on-style': 'error',
               'vue/v-slot-style': 'error',

               // Priority C: Recommended
               'vue/attributes-order': 'off',
               'vue/component-tags-order': [
                  'error',
                  {
                     'order': [ 'template', 'script', 'style' ],
                  },
               ],
               'vue/no-lone-template': 'error',
               'vue/no-multiple-slot-args': 'error',
               'vue/no-v-html': 'off',
               'vue/order-in-components': 'error',
               'vue/this-in-template': 'error',

               // Uncategorized
               'vue/block-tag-newline': [
                  'error',
                  {
                     'singleline': 'always',
                     'multiline': 'always',
                     'maxEmptyLines': 0,
                  },
               ],
               'vue/component-name-in-template-casing': 'error',
               'vue/custom-event-name-casing': [ 'error', 'camelCase' ],
               'vue/html-button-has-type': 'error',
               'vue/html-comment-content-newline': 'error',
               'vue/html-comment-content-spacing': 'error',
               'vue/html-comment-indent': [ 'error', 3 ],
               'vue/match-component-file-name': [
                  'error',
                  {
                     'extensions': [ 'vue' ],
                     'shouldMatchCase': true,
                  },
               ],
               // 'vue/new-line-between-multi-line-property': 'off',
               // 'vue/next-tick-style': 'off',
               // 'vue/no-bare-strings-in-template': 'off',
               // 'vue/no-boolean-default': 'off',
               'vue/no-deprecated-v-is': 'error',
               'vue/no-duplicate-attr-inheritance': 'error',
               // 'vue/no-empty-component-block': 'off',
               'vue/no-invalid-model-keys': 'error',
               'vue/no-multiple-objects-in-class': 'error',
               'vue/no-multiple-template-root': 'off',
               'vue/no-potential-component-option-typo': 'error',
               'vue/no-reserved-component-names': [
                  'error',
                  {
                     'disallowVueBuiltInComponents': true,
                     'disallowVue3BuiltInComponents': true,
                  },
               ],
               // 'vue/no-restricted-block': 'off',
               // 'vue/no-restricted-call-after-await': 'off',
               // 'vue/no-restricted-component-options': 'off',
               // 'vue/no-restricted-custom-event': 'off',
               // 'vue/no-restricted-props': 'off',
               // 'vue/no-restricted-static-attribute': 'off',
               // 'vue/no-restricted-v-bind': 'off',
               // 'vue/no-static-inline-styles': 'off',
               // 'vue/no-template-target-blank': 'TODO',
               'vue/no-this-in-before-route-enter': 'error',
               // 'vue/no-unregistered-components': 'off',
               // 'vue/no-unsupported-features': 'TODO',
               // 'vue/no-unused-properties': 'TODO',
               // 'vue/no-useless-mustaches': 'TODO',
               // 'vue/no-useless-v-bind': 'TODO',
               // 'vue/padding-line-between-blocks': 'TODO',
               // 'vue/require-direct-export': 'TODO',
               'vue/require-emit-validator': 'error',
               // 'vue/require-name-property': 'TODO',
               // 'vue/script-indent': 'TODO',
               // 'vue/sort-keys': 'TODO',
               // 'vue/static-class-names-order': 'TODO',
               // 'vue/v-for-delimiter-style': 'TODO',
               // 'vue/v-on-event-hyphenation': 'TODO',
               // 'vue/v-on-function-call': 'TODO',
               // 'vue/valid-next-tick': 'TODO',

               // Extension Rules
               // 'vue/array-bracket-newline': 'TODO',
               // 'vue/array-bracket-spacing': 'TODO',
               // 'vue/arrow-spacing': 'TODO',
               // 'vue/block-spacing': 'TODO',
               // 'vue/brace-style': 'TODO',
               // 'vue/camelcase': 'TODO',
               // 'vue/comma-dangle': 'TODO',
               // 'vue/comma-spacing': 'TODO',
               // 'vue/comma-style': 'TODO',
               // 'vue/dot-location': 'TODO',
               // 'vue/dot-notation': 'TODO',
               // 'vue/eqeqeq': 'TODO',
               // 'vue/func-call-spacing': 'TODO',
               // 'vue/key-spacing': 'TODO',
               // 'vue/keyword-spacing': 'TODO',
               // 'vue/max-len': 'TODO',
               // 'vue/no-constant-condition': 'TODO',
               // 'vue/no-empty-pattern': 'TODO',
               // 'vue/no-extra-parens': 'TODO',
               // 'vue/no-irregular-whitespace': 'TODO',
               // 'vue/no-restricted-syntax': 'TODO',
               // 'vue/no-sparse-arrays': 'TODO',
               // 'vue/no-useless-concat': 'TODO',
               // 'vue/object-curly-newline': 'TODO',
               // 'vue/object-curly-spacing': 'TODO',
               // 'vue/object-property-newline': 'TODO',
               // 'vue/operator-linebreak': 'TODO',
               // 'vue/prefer-template': 'TODO',
               // 'vue/space-in-parens': 'TODO',
               // 'vue/space-infix-ops': 'TODO',
               // 'vue/space-unary-ops': 'TODO',
               // 'vue/template-curly-spacing': 'TODO',
            }
         ),
      },
   ],
};
