/*
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const config = require('./index'),
      globals = require('globals');

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

module.exports = {
   complete: [
      ...config,
      testConfig,
   ],
   discrete: testConfig,
};
