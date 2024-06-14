/**
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const config = require('./index'),
      globals = require('globals');

module.exports = [
   ...config,
   {
      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.commonjs,
         },
      },
   },
];
