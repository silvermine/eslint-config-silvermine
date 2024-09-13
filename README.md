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
// TODO: add example config
```

## Using Specific Configurations

We maintain specific configurations for various project scenarios, such as
Node.js, Mocha.js test suites, Vue3, and Vue2.

These configs export two JS objects:

   * `complete`: A configuration that includes our base config, and overrides or
      additions relevant to your project scenario.
   * `discrete`: Just the overrides or additions relevant to your
      project scenario.

Use these configurations in your project's `eslint.config.js` file:

```js
const { discrete } = require('@silvermine/eslint-config/node-tests');

module.exports = [
   {
      files: [ 'tests/**.ts' ],
      ...discrete
   }
]
```

```js
const { complete } = require('@silvermine/eslint-config/node-tests');

module.exports = [
   ...complete
]
```

If you need to use multiple discrete configs or override the import variable
name, use object destructuring like so:

```js
const { complete: nodeTests } = require('@silvermine/eslint-config/node-tests');
```

### VS Code Support

For VS Code users, switch to the prerelease version of the VS Code ESLint extension,
version 3.0.5 or later. Then in `.vscode/setting.json` enable the `useFlatConfig`option:

```json
{
   "eslint.useFlatConfig": true
}
```

## Other Configuration Files Available

In addition to the ESLint rules, this package provides configuration for the following:

   * [EditorConfig](https://editorconfig.org/)
      * Provides a default set of editor configuration values to use in Silvermine projects
      * Usage: Symlink the .editorconfig file to the root of your project and use the
        appropriate extension for your editor.
      * `ln -s ./node_modules/@silvermine/eslint-config/.editorconfig`
   * [commitlint](https://conventional-changelog.github.io/commitlint/)
      * Provides linting for commit messages of Silvermine projects
      * Usage: Add a `commitlint.config.js` file to the root of the project with the
        following and then set up commitlint in the project:

        ```javascript
        'use strict';

        module.exports = {
           extends: [ '@silvermine/eslint-config/commitlint' ],
        };
        ```


## Notes on Semantic Versioning

See the [notes we made in eslint-plugin-silvermine][semver-notes] regarding our use of
version numbers here. The same decisions made for that repo also apply to this repo,
basically for the same reasons.

[semver-notes]: https://github.com/silvermine/eslint-plugin-silvermine/#note-on-semantic-versioning


## What version should I use?

When choosing which version of this config to use, consider the following:

   * v2.x.x is the newest branch of our config, which allows for ES2015+ features, as well
     as TypeScript linting. On new projects, we recommend using this branch of the config.
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
