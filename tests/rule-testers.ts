import { RuleTester } from 'eslint';
import tsParser from '@typescript-eslint/parser';

export function es6(): RuleTester {
   return new RuleTester({
      languageOptions: {
         ecmaVersion: 2022,
         sourceType: 'script',
      },
   });
}

export function typeScript(): RuleTester {
   return new RuleTester({
      languageOptions: {
         parser: tsParser,
         ecmaVersion: 2022,
         sourceType: 'module',
      },
   });
}
