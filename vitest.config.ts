import { defineConfig } from 'vitest/config';

export default defineConfig({
   test: {
      include: [ 'tests/**/*.test.ts' ],
      coverage: {
         provider: 'v8',
         reporter: [ 'text', 'lcov', 'html' ],
         include: [
            // Only the eslint-plugin code is tested
            'src/plugin/**/*.ts',
         ],
         exclude: [ '**/*.test.ts', '**/*.d.ts' ],
      },
   },
});
