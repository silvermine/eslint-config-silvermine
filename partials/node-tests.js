/*
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const globals = require('globals');

module.exports = {
   languageOptions: {
      globals: {
         ...globals.mocha,
      },
   },
   rules: {
      'no-empty-function': 'off',
   },
};
