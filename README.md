# Silvermine ESLint Rules

[![NPM Version](https://img.shields.io/npm/v/@silvermine/eslint-config-silvermine.svg)](https://www.npmjs.com/package/@silvermine/eslint-config-silvermine)
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


## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
