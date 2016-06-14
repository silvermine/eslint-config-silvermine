# SilverMine eslint plugin

[![Build Status](https://travis-ci.org/silvermine/eslint-plugin-silvermine.png?branch=master)](https://travis-ci.org/silvermine/eslint-plugin-silvermine)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/eslint-plugin-silvermine/badge.svg?branch=master)](https://coveralls.io/github/silvermine/eslint-plugin-silvermine?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/eslint-plugin-silvermine.png)](https://david-dm.org/silvermine/eslint-plugin-silvermine)
[![Dev Dependency Status](https://david-dm.org/silvermine/eslint-plugin-silvermine/dev-status.png)](https://david-dm.org/silvermine/eslint-plugin-silvermine#info=devDependencies&view=table)

## What?

Shareable [eslint](http://eslint.org/) plugins that are used by our shareable config rules.
See [eslint-config-silvermine](https://github.com/silvermine/eslint-config-silvermine/) for more details.

## Why?

Because we need it. Whitespace errors are evil. As are the other hundreds of types of errors this protects us from.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-silvermine`:

```
$ npm install eslint-plugin-silvermine --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-silvermine` globally.

## Usage

Add `silvermine` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "silvermine"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "silvermine/fluent-chaining": 2
    }
}
```

## Supported Rules

- [fluent-chaining](docs/rules/fluent-chaining.md)
- [call-indentation](docs/rules/call-indentation.md)
- [array-indentation](docs/rules/array-indentation.md)
- [no-multiple-inline-functions](docs/rules/no-multiple-inline-functions.md)

## License

This software is released under the MIT license. See [the license file](LICENSE) for more details.
