/*
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */
import config from './index.js';
import globals from 'globals';

const testConfig = {
   languageOptions: {
      globals: {
         ...globals.mocha,
      },
   },
   rules: {
      'no-empty-function': 'off',
   },
};

export default {
   complete: [
      ...config,
      testConfig,
   ],
   discrete: testConfig,
};
