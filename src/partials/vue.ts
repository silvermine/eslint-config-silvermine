import type { Linter } from 'eslint';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import typescriptESLint from 'typescript-eslint';
import typescriptConfig from './typescript.js';

const config: Linter.Config = {
   plugins: {
      '@typescript-eslint': typescriptESLint.plugin,
   },
   languageOptions: {
      parser: vueParser,
      // These are the options for parsing the <script> tag inside of Vue files
      parserOptions: {
         ...(typescriptConfig.languageOptions?.parserOptions || {}),
         extraFileExtensions: [ '.vue' ],
      },
      globals: {
         ...globals.browser,
      },
   },
};

export default config;
