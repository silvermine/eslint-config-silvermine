/**
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */
import type { Linter } from 'eslint';
import globals from 'globals';

const config: Linter.Config = {
   languageOptions: {
      globals: {
         ...globals.browser,
         ...globals.commonjs,
      },
   },
};

export default config;
