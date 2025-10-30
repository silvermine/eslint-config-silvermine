/**
 * This file contains the default linting configuration for JS code wherever it may
 * appear. Separately, there are rulesets like node, browser, and node-test, each for
 * their respective environments.
 *
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const ignores = require('./partials/ignores'),
      base = require('./partials/base'),
      javascript = require('./partials/javascript'),
      typescript = require('./partials/typescript'),
      vueConfig = require('./partials/vue'),
      vueBaseRules = require('./partials/vue/vue-base'),
      vue3rules = require('./partials/vue/vue-3'),
      typeDefintions = require('./partials/type-definitions'),
      esLint = require('@eslint/js'),
      typescriptESLint = require('typescript-eslint'),
      eslintPluginVue = require('eslint-plugin-vue');

module.exports = [
   esLint.configs.recommended,
   ignores,
   base,
   ...typescriptESLint.configs.recommended,
   {
      files: [ '**/*.ts' ],
      ...typescript,
      languageOptions: {
         ...typescript.languageOptions,
         parserOptions: {
            ...typescript.languageOptions.parserOptions,
            project: [ './tsconfig.node.json' ],
         },
      },
   },
   {
      files: [ '**/*.js', '**/*.cjs' ],
      ...javascript,
   },
   {
      files: [ '*.d.ts' ],
      ...typeDefintions,
   },
   ...eslintPluginVue.configs['flat/strongly-recommended'],
   {
      files: [ '**/*.vue' ],
      ...vueConfig,
      rules: {
         ...typescript.rules,
         ...vueBaseRules,
         ...vue3rules,
      },
      languageOptions: {
         ...vueConfig.languageOptions,
         parserOptions: {
            ...vueConfig.languageOptions.parserOptions,
            project: [ './tsconfig.web.json' ],
            extraFileExtensions: [ '.vue' ],
         },
      },
   },
];
