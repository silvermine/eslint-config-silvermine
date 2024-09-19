# Changelog

All notable changes to this project will be documented in this file.
See [our coding standards][commit-messages] for commit guidelines.

### [3.2.1](https://github.com/silvermine/eslint-config-silvermine/compare/v3.2.0...v3.2.1) (2024-09-19)


### Bug Fixes

* ignore cdk.out directories ([d072345](https://github.com/silvermine/eslint-config-silvermine/commit/d0723458f86afd1db68bb3302dcb0a8745e939f1))
* remove invalid member-ordering value ([0f0349d](https://github.com/silvermine/eslint-config-silvermine/commit/0f0349d1e677036ac4575ac75de1c4efe5c313c3))


## [3.2.0](https://github.com/silvermine/eslint-config-silvermine/compare/v3.1.0...v3.2.0) (2023-11-10)


### Features

* allow longer function declaration lines ([11e4950](https://github.com/silvermine/eslint-config-silvermine/commit/11e4950d442ef544bf8562e4ee12b4b6c986aed7))
* fine tune naming conventions ([#92](https://github.com/silvermine/eslint-config-silvermine/issues/92)) ([ae13be5](https://github.com/silvermine/eslint-config-silvermine/commit/ae13be5e34840395722a3d620dea4d469ce5de93))
* supporting linting of CJS file extensions ([69effe6](https://github.com/silvermine/eslint-config-silvermine/commit/69effe63ddebd0f023ae47f723f8bb70ec491be6))


### Bug Fixes

* vue/multi-word-component-names should be universal ([615ae24](https://github.com/silvermine/eslint-config-silvermine/commit/615ae240fb566778e5d4cdf1137688582c086003))


## [3.1.0](https://github.com/silvermine/eslint-config-silvermine/compare/v3.0.1...v3.1.0) (2022-08-30)


### Features

* Add `vue/setup-compiler-macros` environment setting ([90b1e78](https://github.com/silvermine/eslint-config-silvermine/commit/90b1e78f91d7a9ed7b24928f5d192e05ff293eb7))
* add linting rules for Vue components ([2a18ccb](https://github.com/silvermine/eslint-config-silvermine/commit/2a18ccb210febd29fa0675c888f360e839f7dd9f))
* Add separate eslint config for Vue2 code ([1957b57](https://github.com/silvermine/eslint-config-silvermine/commit/1957b57b710cd4772e2484b2493738194ce3fcd9))
* Adjust rules for Vue 3 ([cc24d4b](https://github.com/silvermine/eslint-config-silvermine/commit/cc24d4b5c42d6873471339adc793d9384f6ff392))
* Allow TypeScript type aliases ([#73](https://github.com/silvermine/eslint-config-silvermine/issues/73)) ([6f2a10c](https://github.com/silvermine/eslint-config-silvermine/commit/6f2a10c407299bc1369532db1391892224785198))
* Override member-ordering rule ([e9fc7a9](https://github.com/silvermine/eslint-config-silvermine/commit/e9fc7a9f3c9ce6717d86f212736860bd3f2c27a6))


### Bug Fixes

* ensure eslint does not ignore .vuepress directories ([e1d7a18](https://github.com/silvermine/eslint-config-silvermine/commit/e1d7a18a3a45598c3d59b9da10713a0abeefbf71))


## [3.0.0-rc.0](https://github.com/silvermine/eslint-config-silvermine/compare/v2.3.0...v3.0.0-rc.0) (2020-01-22)

Marked as a major release because this version of the config relies on eslint@6. Previous
versions relied on eslint@5. We're also using a newer version of node and NPM now,
although that should not impact users.

### Features

* Remove no-restricted-syntax for JSX ([f380c41](https://github.com/silvermine/eslint-config-silvermine/commit/f380c41220d7fc7222499c6c9b09fa33f16b0462))
* upgrade @silvermine/eslint-plugin for eslint 6 upgrade ([f24f857](https://github.com/silvermine/eslint-config-silvermine/commit/f24f8573490878b72bec47fae9240e82732973a4))


### Bug Fixes

* add config type to valid commitlint types ([#61](https://github.com/silvermine/eslint-config-silvermine/issues/61)) ([3229252](https://github.com/silvermine/eslint-config-silvermine/commit/322925295abe4c29e7cecdaf1b39cb91c43e9d9c))


## [2.3.0](https://github.com/silvermine/eslint-config-silvermine/compare/v2.2.1...v2.3.0) (2019-09-03)


### Features

* Add 'sub' type ([#49](https://github.com/silvermine/eslint-config-silvermine/issues/49)) ([0e2938e](https://github.com/silvermine/eslint-config-silvermine/commit/0e2938e))
* Limit scopes to the set of available types ([#49](https://github.com/silvermine/eslint-config-silvermine/issues/49)) ([c9b9b27](https://github.com/silvermine/eslint-config-silvermine/commit/c9b9b27))

<a name="2.2.1"></a>
## [2.2.1](https://github.com/silvermine/eslint-config-silvermine/compare/v2.2.0...v2.2.1) (2019-04-05)


### Bug Fixes

* allow multiple cases for a single block inside switch statements ([f657b77](https://github.com/silvermine/eslint-config-silvermine/commit/f657b77))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/silvermine/eslint-config-silvermine/compare/v2.1.0...v2.2.0) (2019-04-04)


### Features

* Error on 'var' in TypeScript files ([fb319cf](https://github.com/silvermine/eslint-config-silvermine/commit/fb319cf))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/silvermine/eslint-config-silvermine/compare/v2.0.0...v2.1.0) (2019-02-28)


### Features

* Turn off no-empty-function rule for tests ([24d4800](https://github.com/silvermine/eslint-config-silvermine/commit/24d4800))
* Adjust commitlint config for our standards ([0034b96](https://github.com/silvermine/eslint-config-silvermine/commit/0034b96))
* copy convention commitlint config ([777f090](https://github.com/silvermine/eslint-config-silvermine/commit/777f090))


<a name="2.0.0"></a>
# [2.0.0](https://github.com/silvermine/eslint-config-silvermine/compare/v1.5.0...v2.0.0) (2019-02-08)

Version 2.0.0 was a major "rethink" of our rules, changing some past decisions, but
primarily focusing on what we needed to change to add support for newer ES* features and
TypeScript.

[commit-messages]: https://github.com/silvermine/silvermine-info/blob/master/commit-history.md#commit-messages
