/**
 * This file contains the default linting configuration for JS code wherever it may
 * appear. Separately, there are rulesets like node, browser, and node-test, each for
 * their respective environments.
 *
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */
import { defineConfig } from 'eslint/config';
import ignores from './partials/ignores.js';
import base from './partials/base.js';
import javascript from './partials/javascript.js';
import typescript from './partials/typescript.js';
import vueConfig from './partials/vue.js';
import vueBaseRules from './partials/vue/vue-base.js';
import vue3rules from './partials/vue/vue-3.js';
import typeDefinitions from './partials/type-definitions.js';
import esLint from '@eslint/js';
import typescriptESLint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';

const typescriptRecommended = typescriptESLint.configs.recommended.map((config) => {
   return {
      ...config,
      files: [ '**/*.ts' ],
   };
});

const config = defineConfig([
   esLint.configs.recommended,
   ignores,
   base,
   ...typescriptRecommended,
   {
      files: [ '**/*.ts' ],
      ...typescript,
   },
   {
      files: [ '**/*.js', '**/*.cjs' ],
      ...javascript,
   },
   {
      files: [ '*.d.ts' ],
      ...typeDefinitions,
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
   },
]);

export default config;
