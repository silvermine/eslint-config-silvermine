# Silvermine ESLint Rules

[![NPM Version](https://img.shields.io/npm/v/@silvermine/eslint-config.svg)](https://www.npmjs.com/package/@silvermine/eslint-config)
[![License](https://img.shields.io/github/license/silvermine/eslint-config-silvermine.svg)](./LICENSE)
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

## Migration to ESLint flat config

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

Silvermine ESLint rules are a bit of a special case when it comes to semantic versioning.
This config is a development tool; adding or tightening a rule may cause lint errors in
consuming projects, but it does not break runtime behavior. So what is a "breaking change"
in this repo? Definitely a major change to our coding standards (e.g. changing how many
spaces we use for indents, or changing to tabs) would be a major, breaking change because
every code file would need to be changed. But there are many smaller changes that can be
made (introducing a new rule that we've basically followed by convention, for example)
that are not really breaking, but may require some minor codebase changes when you upgrade
to the newer rule config. Even fixing a bug (a patch version) could require changes to
your codebase if the rule implementation was not finding violations previously.

Thus, we've decided that on this particular repo we will not strictly follow semantic
versioning. Instead, new rules can be added with a minor version bump. Something that's
strictly a bug fix of an existing rule (not changing the principle of the rule) can be
done in a patch version. Major versions will be reserved for massive, sweeping changes in
rules (primarily big policy changes rather than simply technical changes, e.g. a peer
dependency bump).

## What version should I use?

When choosing which version of this config to use, consider the following:

   * v4.x.x requires ESLint 9 and uses flat config _only_. On new projects, we recommend
     using this version.
   * v3.x.x requires ESLint 8.57+ and uses flat config _only_.
   * v2.x.x allows for ES2015+ features, as well as TypeScript linting.
   * v1.x.x is the legacy version of our eslint config. This should primarily be used in
     legacy es5 projects and with node version < 8.10.0. It does not allow for many
     es2015+ features, such as spread/rest operators and arrow functions.
      * The v1.x.x branch is not recommended for use in new projects and will only be
        minimally updated with bug fixes to support legacy code.

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
