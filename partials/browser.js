/**
 * Copyright (c) 2017 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const globals = require('globals');

module.exports = {
   languageOptions: {
      globals: {
         ...globals.browser,
         ...globals.commonjs,
      },
   },
};
