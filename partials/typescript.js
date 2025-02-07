const typescriptESLintParser = require('@typescript-eslint/parser'),
      stylistic = require('@stylistic/eslint-plugin');

module.exports = {
   plugins: {
      '@stylistic': stylistic,
   },
   languageOptions: {
      'parserOptions': {
         'parser': typescriptESLintParser,
         'sourceType': 'module',
         // Disable warning banner for possibly incompatible versions of TypeScript
         'loggerFn': false,
      },
   },
   'rules': {
      // The standard ESLint `no-dupe-class-members` rule will report false
      // positives for overloaded TypeScript class methods. This rule is safe to
      // disable because actual duplicate class members will be caught by the
      // TypeScript compiler.
      'no-dupe-class-members': 'off',
      // TODO: figure out how to fix no-undef.
      // Currently, no-undef causes false positives for TypeScript class properties.
      // With TypeScript-only code this rule can safely be disabled because
      // TypeScript won't compile if the definition is missing. However, if we use
      // any JavaScript in the project we need to have it enabled.
      'no-undef': 'off',
      // The standard ESLint `no-unused-vars' rule will throw false positives with
      // class properties in TypeScript. The TypeScript-specific rule fixes this.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      // For TypeScript code, `const`/`let` should be used exclusively
      'no-var': 'error',
      // new-cap throws errors with property decorators
      'new-cap': 'off',

      // TypeScript will be parsed in strict mode and output the `use-strict`
      // directive for the transpiled JavaScript automatically.
      'strict': [ 'error', 'never' ],

      'no-empty-function': [ 'error', { 'allow': [ 'constructors' ] } ],

      '@typescript-eslint/adjacent-overload-signatures': 'error',

      // Disable ESLint's camelcase so we can override with our own
      // naming convention rules.
      'camelcase': 'off',

      '@typescript-eslint/naming-convention': [
         'error',
         {
            selector: 'classProperty',
            modifiers: [ 'private' ],
            format: [ 'camelCase' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'protected' ],
            format: [ 'camelCase' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'private', 'static' ],
            format: [ 'snake_case' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'private', 'readonly', 'static' ],
            format: [ 'UPPER_CASE' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'protected', 'readonly', 'static' ],
            format: [ 'UPPER_CASE' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'public', 'readonly', 'static' ],
            format: [ 'UPPER_CASE' ],
         },
         {
            selector: 'classProperty',
            modifiers: [ 'protected', 'static' ],
            format: [ 'snake_case' ],
            leadingUnderscore: 'require',
         },
         {
            selector: 'classProperty',
            modifiers: [ 'public', 'static' ],
            format: [ 'snake_case' ],
            leadingUnderscore: 'forbid',
         },
         {
            selector: 'enum',
            format: [ 'PascalCase' ],
         },
         {
            selector: 'typeLike',
            format: [ 'PascalCase' ],
         },
         {
            selector: 'variable',
            format: [ 'camelCase', 'PascalCase' ],
         },
         {
            selector: 'parameter',
            format: [ 'camelCase', 'PascalCase' ],
            leadingUnderscore: 'allow',
         },
         {
            selector: 'variable',
            modifiers: [ 'global' ],
            format: [ 'UPPER_CASE', 'camelCase', 'PascalCase' ],
         },
      ],
      // no-shadow is incompatible with TypeScript code.
      // @typescript-eslint/no-shadow replaces it.
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      // no-redeclare is incompatible with TypeScript code.
      // @typescript-eslint/no-redeclare replaces it.
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': [ 'error' ],
      '@typescript-eslint/explicit-function-return-type': [ 'error', { 'allowExpressions': true } ],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/member-delimiter-style': 'error',
      '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'as' } ],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/member-ordering': [
         'error',
         {
            'default': [
               // Index signature
               'signature',
               'call-signature',

               // Fields
               'public-static-field',
               'protected-static-field',
               'private-static-field',

               'public-instance-field',
               'protected-instance-field',
               'private-instance-field',

               'public-abstract-field',
               'protected-abstract-field',

               'public-field',
               'protected-field',
               'private-field',

               'static-field',
               'instance-field',
               'abstract-field',

               'field',

               // Constructors
               'public-constructor',
               'protected-constructor',
               'private-constructor',

               'constructor',

               // Methods
               [ 'public-static-method', 'public-static-get', 'public-static-set' ],
               [ 'protected-static-method', 'protected-static-get', 'protected-static-set' ],
               [ 'private-static-method', 'private-static-get', 'private-static-set' ],

               [ 'public-instance-method', 'public-instance-get', 'public-instance-set' ],
               [ 'protected-instance-method', 'protected-instance-get', 'protected-instance-set' ],
               [ 'private-instance-method', 'private-instance-get', 'private-instance-set' ],

               [ 'public-abstract-method', 'public-abstract-get', 'public-abstract-set' ],
               [ 'protected-abstract-method', 'protected-abstract-get', 'protected-abstract-set' ],

               'public-method',
               'protected-method',
               'private-method',

               [ 'static-method', 'static-get', 'static-set' ],
               [ 'instance-method', 'instance-get', 'instance-set' ],
               [ 'abstract-method', 'abstract-get', 'abstract-set' ],

               'method',
            ],
         },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/parameter-properties': [ 'error', { 'allow': [ 'private' ] } ],
      '@typescript-eslint/triple-slash-reference': [ 'error', { 'path': 'never', 'types': 'never', 'lib': 'never' } ],
      '@typescript-eslint/type-annotation-spacing': [
         'error',
         {
            'before': false,
            'after': true,
            'overrides': {
               'arrow': { 'before': true, 'after': true },
            },
         },
      ],
      '@typescript-eslint/no-empty-interface': 'error',

      // Turn off the core no-use-before-define to avoid double reporting errors.
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
         'error',
         {
            'functions': false,
            'typedefs': false,
         },
      ],

      // Replace eslint space-infix-ops with equivalent typescript-eslint rule to support
      // linting type definitions
      'space-infix-ops': 'off',
      '@typescript-eslint/space-infix-ops': [ 'error' ],
   },
};
