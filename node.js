/*
 * Copyright (c) 2016 Jeremy Thomerson
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
            ...globals.node,
         },
      },
   },
];
