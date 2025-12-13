/*
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */
import type { Linter } from 'eslint';
import globals from 'globals';

const config: Linter.Config = {
   languageOptions: {
      globals: {
         ...globals.mocha,
      },
   },
   rules: {
      'no-empty-function': 'off',
   },
};

export default config;
