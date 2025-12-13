# Silvermine ESLint Rules

[![NPM Version][npm-version]][npm-version-url]
[![License][license-badge]](./LICENSE)
[![Build Status][build]][build-url]
[![Coverage Status][coverage]][coverage-url]
![Conventional Commits][conventional]


## What?

Shareable [ESLint](http://eslint.org/) configuration for all Silvermine projects.

## Why?

Because we need it. Whitespace errors are evil. As are the other hundreds of
types of errors this protects us from.

## Running ESLint

It is recommended to run ESLint via a NPM script in `package.json` with the command
`eslint .` for  projects that use this configuration.

Example:

```json
{
   "scripts": {
      "eslint": "eslint ."
   }
}
```

## Migration to ESLint Flat Config

ESLint version 8.57 and later enable support for ESLint's flat config. As opposed to using
a customized configuration engine, this enables users to configure ESLint using JS objects
and results in more flexibility and control over configuration.

Add a file named `eslint.config.js` to the root of your project and import our
configuration like so:

```js
import config from '@silvermine/eslint-config';

export default [
   ...config,
];
```

## Using Configuration Partials

We maintain specific configurations for various project scenarios, such as Node.js,
Mocha.js test suites, Vue 3, and Vue 2.

When using `eslint-config-silvermine` you have the option of using the default
configuration. For example, below is how you would configure a Node.js project with
TypeScript:

```js
import config from '@silvermine/eslint-config';
import node from '@silvermine/eslint-config/partials/node';
import typescript from '@silvermine/eslint-config/partials/typescript';

export default [
   ...config,
   {
      files: [ '**/*.ts' ],
      ...typescript,
      languageOptions: {
         parserOptions: {
            project: 'tsconfig.node.json',
         },
      },
      ...node,
   },
];
```

Notice that we must specify the `project` property within `languageOptions.parserOptions`
to enable TypeScript strongly typed linting.

Below is how you would configure a browser library that uses only vanilla JS:

```js
import config from '@silvermine/eslint-config';
import browser from '@silvermine/eslint-config/partials/browser';

export default [
   ...config,
   {
      files: [ '**/*.js' ],
      ...browser,
   },
];
```

When you need to override different parts of the config given specific project
requirements, you can pull in configuration objects from the `partials` project directory:


```js
import config from '@silvermine/eslint-config';
import node from '@silvermine/eslint-config/partials/node';
import nodeTests from '@silvermine/eslint-config/partials/node-tests';

export default [
   ...config,
   {
      files: [ 'tests/**/*.ts' ],
      ...node,
      ...nodeTests,
   },
];
```

### Vue Support

Below is an example of using Vue 3 with TypeScript:

```js
import config from '@silvermine/eslint-config';
import vue from '@silvermine/eslint-config/partials/vue';

export default [
   ...config,
   {
      files: [ '**/*.vue' ],
      ...vue,
      languageOptions: {
         parserOptions: {
            project: 'tsconfig.web.json',
         },
      },
   },
];
```


For legacy Vue.js 2.x projects, a Vue-2-specific configuration is available. In this
situation your project would be configured like so:

```js
import config from '@silvermine/eslint-config';
import eslintPluginVue from 'eslint-plugin-vue';
import vueConfig from '@silvermine/eslint-config/partials/vue';
import vueBaseRules from '@silvermine/eslint-config/partials/vue/vue-base';

export default [
   ...config,
   ...eslintPluginVue.configs['flat/vue2-strongly-recommended'],
   {
      files: [ 'src/**/*.vue' ],
      ...vueConfig,
      rules: vueBaseRules,
   },
];
```

### VS Code Support

For VS Code users, your installed version of the ESLint extension must be 3.0.5 or later.
This version of the extension supports flat config, while earlier versions only provide
partial support.

You _may_ need to adjust the project's local `.vscode/setting.json` and enable the
`useFlatConfig`option:

```json
{
   "eslint.useFlatConfig": true
}
```

## Notes on Semantic Versioning

There are some unusual concepts with this repo that we have to deal with when versioning
it. For example, what is a "breaking change" in this repo? Definitely a major change to
our coding standards (e.g. changing how many spaces we use for indents, or changing to
tabs) would be a major, breaking change because every code file would need to be changed.
But there are many smaller changes that can be made (introducing a new rule that we've
basically followed by convention, for example) that are not really breaking, but may
require some minor codebase changes when you upgrade to the newer rule config. Even fixing
a bug (a patch version) could require changes to your codebase if the rule implementation
was not finding violations previously.

Thus, we've decided that on this particular repo we will not strictly follow semantic
versioning. Instead, new rules can be added with a minor version bump. Something that's
strictly a bug fix of an existing rule (not changing the principle of the rule) can be
done in a patch version. Major versions will be reserved for massive, sweeping changes in
rules - in other words, primarily big policy changes rather than simply technical changes.

## What version should I use?

When choosing which version of this config to use, consider the following:

   * **v4.x.x** supports the latest ECMAScript features, and supports ESLint's flat config
     configuration style _only_. On new projects, we recommend using this branch of the
     config.
   * **v2.x.x** allows for ES2015+ features, as well as TypeScript linting.
   * **v1.x.x** is the legacy version of our eslint config. This should primarily be used
     in legacy es5 projects and with node version < 8.10.0. It does not allow for many
     es2015+ features, such as spread/rest operators and arrow functions. The v1.x.x
     branch is not recommended for use in new projects and will only be minimally updated
     with bug fixes to support legacy code.

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.

[npm-version]: https://img.shields.io/npm/v/@silvermine/eslint-config.svg
[npm-version-url]: https://www.npmjs.com/package/@silvermine/eslint-config
[license-badge]: https://img.shields.io/github/license/silvermine/eslint-config.svg
[build]: https://github.com/silvermine/eslint-config/actions/workflows/ci.yml/badge.svg
[build-url]: https://travis-ci.org/silvermine/eslint-config.svg?branch=master
[coverage]: https://coveralls.io/repos/github/silvermine/eslint-config/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/silvermine/eslint-config?branch=master
[conventional]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
