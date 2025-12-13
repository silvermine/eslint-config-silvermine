import type { Linter } from 'eslint';
import typescriptESLint from 'typescript-eslint';

const config: Linter.Config = {
   plugins: {
      '@typescript-eslint': typescriptESLint.plugin,
   },
   rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
   },
};

export default config;
