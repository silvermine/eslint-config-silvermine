'use strict';

const config = require('./index'),
      node = require('./partials/node');

module.exports = [
   ...config,
   {
      files: [ '**/*.ts' ],
      languageOptions: {
         parserOptions: {
            project: [ './tsconfig.node.json' ],
         },
      },
   },
   {
      ...node,
   },
];
