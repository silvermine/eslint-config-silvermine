import { defineConfig, globalIgnores } from 'eslint/config';
import config from './dist/index.js';
import node from './dist/partials/node.js';

export default defineConfig([
   ...config,
   node,
   // Disable type-checked rules for test-cases (they are intentional example files)
   globalIgnores([
      'test-cases/**/*.vue',
      'test-cases/**/*.ts',
      'test-cases/**/*.js',
   ]),
]);
