import type { Linter } from 'eslint';

const config: Linter.Config = {
   rules: {
      '@typescript-eslint/no-var-requires': 'off',
   },
};

export default config;
