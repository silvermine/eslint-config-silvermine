module.exports = {
   ignores: [
      '**/cdk.out/**',
      '**/.esbuild/**',
      '**/dist/**',
      // ESLint by default ignores directories with dot prefixes. Some of our
      // projects use VuePress which maintains its source code in a
      // `.vuepress` directory. This negated ignore pattern enables linting
      // for any projects using our config.
      '!.vuepress',
   ],
};
