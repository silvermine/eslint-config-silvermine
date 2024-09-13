/*
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

const config = require('./index'),
      globals = require('globals');

const nodeConfig = {
   languageOptions: {
      globals: {
         ...globals.node,
      },
   },
};

module.exports = {
   complete: [
      ...config,
      nodeConfig,
   ],
   discrete: nodeConfig,
};
