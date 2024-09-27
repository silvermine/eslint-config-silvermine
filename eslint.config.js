'use strict';

const config = require('./index'),
      node = require('./partials/node');

module.exports = [
   ...config,
   {
      ...node,
   },
];
