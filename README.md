# Silvermine ESLint Rules

[![NPM Version](https://img.shields.io/npm/v/@silvermine/eslint-config.svg)](https://www.npmjs.com/package/@silvermine/eslint-config)
[![License](https://img.shields.io/github/license/silvermine/eslint-config-silvermine.svg)](./LICENSE)
[![Build Status](https://travis-ci.org/silvermine/eslint-config-silvermine.svg?branch=master)](https://travis-ci.org/silvermine/eslint-config-silvermine)
[![Dependency Status](https://david-dm.org/silvermine/eslint-config-silvermine.svg)](https://david-dm.org/silvermine/eslint-config-silvermine)
[![Dev Dependency Status](https://david-dm.org/silvermine/eslint-config-silvermine/dev-status.svg)](https://david-dm.org/silvermine/eslint-config-silvermine#info=devDependencies&view=table)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


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

## Migration to ESLint flag config

ESLint version 8.57 and later enable support for ESLint's flat config. As opposed
to using a customized configuration engine, this enables users to configure ESLint
using JS objects and results in more flexibility and control over configuration.

Add a file named `eslint.config.js` to the root of your project and import our
configuration like so:

```js
const silvermineNodeConfig = require('@silvermine/eslint-config/node');

module.exports = [
   ...silvermineNodeConfig.complete,
];
```

## Using Configuration Partials

We maintain specific configurations for various project scenarios, such as
Node.js, Mocha.js test suites, Vue3, and Vue2.

When using `eslint-config-silvermine` you have the option of using the default
configuration. For example, below is how you would configure a Node.js project
with TypeScript:

```js
const config = require('@silvermine/eslint-config'),
      node = require('@silvermine/eslint-config/partials/node'),
      typescript = require('@silvermine/eslint-config/partials/typescript');

module.exports = [
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
const config = require('@silvermine/eslint-config'),
      browser = require('@silvermine/eslint-config/partials/browser');

module.exports = [
   ...config,
   {
      files: [ '**/*.js' ],
      ...browser
   }
];
```

When you need to override different parts of the config given specific project
requirements, you can pull in configuration objects from the `partials`
project directory:


```js
const config = require('@silvermine/eslint-config'),
      node = require('@silvermine/eslint-config/partials/node'),
      nodeTests = require('@silvermine/eslint-config/partials/node-tests');

module.exports = [
   ...config,
   {
      files: [ 'tests/**.ts' ],
      ...nodeTests
   }
]
```

### Vue Support

Below is an example of using Vue 3 with TypeScript:

```js
const config = require('@silvermine/eslint-config'),
      vue = require('@silvermine/eslint-config/partials/vue');

module.exports = [
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


For legacy Vue.js 2.x projects, a Vue 2-specific configuration is available.
In this situation your project would be configured like so:

```js
const config = require('@silvermine/eslint-config'),
   eslintPluginVue = require('eslint-plugin-vue'),
   vueConfig = require('@silvermine/eslint-config/partials/vue'),
   vueBaseRules = require('@silvermine/eslint-config/partials/vue/vue-base');

module.exports = [
   ...config,
   ....eslintPluginVue.configs['flat/vue2-strongly-recommended'],
   {
      files: [ 'src/**.vue' ],
      ...vueConfig,
      rules: vueBaseRules
   }
]
```

### VS Code Support

For VS Code users, your installed version of the ESLint extension must be 3.0.5
or later. This version of the extension supports flat config, while earlier
versions only provide partial support.

You _may_ need to adjust the project's local `.vscode/setting.json` and enable
the `useFlatConfig`option:

```json
{
   "eslint.useFlatConfig": true
}
```

## Notes on Semantic Versioning

See the [notes we made in eslint-plugin-silvermine][semver-notes] regarding our use of
version numbers here. The same decisions made for that repo also apply to this repo,
basically for the same reasons.

[semver-notes]: https://github.com/silvermine/eslint-plugin-silvermine/#note-on-semantic-versioning

## What version should I use?

When choosing which version of this config to use, consider the following:

   * v4.x.x supports the latest ECMA Script features, and supports ESLint's
     flat config configuration style _only_. On new projects, we recommend
     using this branch of the config.
   * v2.x.x allows for ES2015+ features, as well as TypeScript linting.
   * v1.x.x is the legacy version of our eslint config. This should primarily be used in
     legacy es5 projects and with node version < 8.10.0. It does not allow for many
     es2015+ features, such as spread/rest operators and arrow functions.
      * The v1.x.x branch is not recommended for use in new projects and will only be
        minimally updated with bug fixes to support legacy code.

## Updating ESLint

Updating ESLint in this project requires multiple steps across both this project and
[@silvermine/eslint-plugin](https://github.com/silvermine/eslint-plugin-silvermine):

1. Open a PR to update ESLint in @silvermine/eslint-plugin
   * Note: Linting in the @silvermine/eslint-plugin PR will likely fail because
    @silvermine/eslint-plugin's version of @silvermine/eslint-config is incompatible with
    the new version of ESLint. That's ok. We will fix it soon in a subsequent step.
2. After the PR from step 1 is merged, update @silvermine/eslint-plugin in
   @silvermine/eslint-config using a `git+https` + git hash URL. The git hash should point
   to the commit in @silvermine/eslint-plugin where you updated ESLint.
3. Update ESLint in @silvermine/eslint-config. Open a PR that contains this update and
   the @silvermine/eslint-plugin update from step 2.
      * Note: All of the linting and tests in this build should pass.
4. Publish a new version of @silvermine/eslint-config to the NPM registry
5. Update @silvermine/eslint-config in @silvermine/eslint-plugin to the version that was
   just published
      * Note: All of the linting and tests in this build should now pass.
6. Publish a new version of @silvermine/eslint-plugin to the NPM registry
7. Update @silvermine/eslint-plugin in @silvermine/eslint-config using the version that was
   just published

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
