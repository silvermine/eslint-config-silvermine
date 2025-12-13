import type { Linter } from 'eslint';
import globals from 'globals';

const config: Linter.Config = {
   languageOptions: {
      globals: {
         ...globals.node,
      },
   },
};

export default config;
