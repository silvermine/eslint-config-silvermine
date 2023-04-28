'use strict';
const vueRulesBase = require('eslint-plugin-vue/lib/configs/base').rules,
      vueRulesEssentials = require('eslint-plugin-vue/lib/configs/essential').rules,
      vue3RulesEssentials = require('eslint-plugin-vue/lib/configs/vue3-essential').rules,
      vueRulesStronglyRecommended = require('eslint-plugin-vue/lib/configs/strongly-recommended').rules,
      vue3RulesStronglyRecommended = require('eslint-plugin-vue/lib/configs/vue3-strongly-recommended').rules,
      vueRulesRecommended = require('eslint-plugin-vue/lib/configs/recommended').rules,
      vue3RulesRecommended = require('eslint-plugin-vue/lib/configs/vue3-recommended').rules;


const silvermineRulesUniversal = {
   // Priority B: Strongly Recommended
   'vue/attribute-hyphenation': [ 'error', 'never' ],
   'vue/component-definition-name-casing': [ 'error', 'PascalCase' ],
   'vue/first-attribute-linebreak': [ 'error', { 'multiline': 'ignore' } ],
   'vue/html-closing-bracket-newline': [
      'error',
      {
         'singleline': 'never',
         'multiline': 'never',
      },
   ],
   'vue/html-closing-bracket-spacing': [
      'error',
      {
         'startTag': 'never',
         'endTag': 'never',
         'selfClosingTag': 'always',
      },
   ],
   'vue/html-end-tags': 'error',
   'vue/html-indent': [
      'error',
      3,
      {
         'attribute': 1,
         'baseIndent': 1,
         'closeBracket': 0,
         'alignAttributesVertically': false,
      },
   ],
   'vue/html-quotes': [ 'error', 'double' ],
   'vue/html-self-closing': 'error',
   'vue/max-attributes-per-line': 'off',
   'vue/multi-word-component-names': 'off',
   'vue/multiline-html-element-content-newline': 'error',
   'vue/mustache-interpolation-spacing': 'error',
   'vue/no-multi-spaces': 'error',
   'vue/no-spaces-around-equal-signs-in-attribute': 'error',
   'vue/no-template-shadow': 'error',
   'vue/one-component-per-file': 'error',
   'vue/prop-name-casing': 'error',
   'vue/require-default-prop': 'error',
   'vue/require-prop-types': 'error',
   'vue/singleline-html-element-content-newline': 'off',
   'vue/v-bind-style': 'error',
   'vue/v-on-style': 'error',
   'vue/v-slot-style': 'error',

   // Priority C: Recommended
   'vue/attributes-order': 'off',
   'vue/component-tags-order': [
      'error',
      {
         'order': [ 'template', 'script', 'style' ],
      },
   ],
   'vue/no-lone-template': 'error',
   'vue/no-multiple-slot-args': 'error',
   'vue/no-v-html': 'off',
   'vue/order-in-components': 'error',
   'vue/this-in-template': 'error',

   // Uncategorized
   'vue/block-tag-newline': [
      'error',
      {
         'singleline': 'always',
         'multiline': 'always',
         'maxEmptyLines': 0,
      },
   ],
   'vue/component-name-in-template-casing': 'error',
   'vue/custom-event-name-casing': [ 'error', 'camelCase' ],
   'vue/html-button-has-type': 'error',
   'vue/html-comment-content-newline': 'error',
   'vue/html-comment-content-spacing': 'error',
   'vue/html-comment-indent': [ 'error', 3 ],
   'vue/match-component-file-name': [
      'error',
      {
         'extensions': [ 'vue' ],
         'shouldMatchCase': true,
      },
   ],
   // 'vue/new-line-between-multi-line-property': 'off',
   // 'vue/next-tick-style': 'off',
   // 'vue/no-bare-strings-in-template': 'off',
   // 'vue/no-boolean-default': 'off',
   'vue/no-duplicate-attr-inheritance': 'error',
   // 'vue/no-empty-component-block': 'off',
   'vue/no-invalid-model-keys': 'error',
   'vue/no-multiple-objects-in-class': 'error',
   'vue/no-multiple-template-root': 'off',
   'vue/no-potential-component-option-typo': 'error',
   'vue/no-reserved-component-names': [
      'error',
      {
         'disallowVueBuiltInComponents': true,
         'disallowVue3BuiltInComponents': true,
      },
   ],
   // 'vue/no-restricted-block': 'off',
   // 'vue/no-restricted-call-after-await': 'off',
   // 'vue/no-restricted-component-options': 'off',
   // 'vue/no-restricted-custom-event': 'off',
   // 'vue/no-restricted-props': 'off',
   // 'vue/no-restricted-static-attribute': 'off',
   // 'vue/no-restricted-v-bind': 'off',
   // 'vue/no-static-inline-styles': 'off',
   // 'vue/no-template-target-blank': 'TODO',
   'vue/no-this-in-before-route-enter': 'error',
   // 'vue/no-unregistered-components': 'off',
   // 'vue/no-unsupported-features': 'TODO',
   // 'vue/no-unused-properties': 'TODO',
   // 'vue/no-useless-mustaches': 'TODO',
   // 'vue/no-useless-v-bind': 'TODO',
   // 'vue/padding-line-between-blocks': 'TODO',
   // 'vue/require-direct-export': 'TODO',
   'vue/require-emit-validator': 'error',
   // 'vue/require-name-property': 'TODO',
   // 'vue/script-indent': 'TODO',
   // 'vue/sort-keys': 'TODO',
   // 'vue/static-class-names-order': 'TODO',
   // 'vue/v-for-delimiter-style': 'TODO',
   // 'vue/v-on-function-call': 'TODO',
   // 'vue/valid-next-tick': 'TODO',

   // Extension Rules
   // 'vue/array-bracket-newline': 'TODO',
   // 'vue/array-bracket-spacing': 'TODO',
   // 'vue/arrow-spacing': 'TODO',
   // 'vue/block-spacing': 'TODO',
   // 'vue/brace-style': 'TODO',
   // 'vue/camelcase': 'TODO',
   // 'vue/comma-dangle': 'TODO',
   // 'vue/comma-spacing': 'TODO',
   // 'vue/comma-style': 'TODO',
   // 'vue/dot-location': 'TODO',
   // 'vue/dot-notation': 'TODO',
   // 'vue/eqeqeq': 'TODO',
   // 'vue/func-call-spacing': 'TODO',
   // 'vue/key-spacing': 'TODO',
   // 'vue/keyword-spacing': 'TODO',
   // 'vue/max-len': 'TODO',
   // 'vue/no-constant-condition': 'TODO',
   // 'vue/no-empty-pattern': 'TODO',
   // 'vue/no-extra-parens': 'TODO',
   // 'vue/no-irregular-whitespace': 'TODO',
   // 'vue/no-restricted-syntax': 'TODO',
   // 'vue/no-sparse-arrays': 'TODO',
   // 'vue/no-useless-concat': 'TODO',
   // 'vue/object-curly-newline': 'TODO',
   // 'vue/object-curly-spacing': 'TODO',
   // 'vue/object-property-newline': 'TODO',
   // 'vue/operator-linebreak': 'TODO',
   // 'vue/prefer-template': 'TODO',
   // 'vue/space-in-parens': 'TODO',
   // 'vue/space-infix-ops': 'TODO',
   // 'vue/space-unary-ops': 'TODO',
   // 'vue/template-curly-spacing': 'TODO',
};

const silvermineRulesVue2Only = {};

const silvermineRulesVue3Only = {
   'vue/no-deprecated-v-is': 'error',
   'vue/v-on-event-hyphenation': [ 'error', 'never' ],
};

module.exports = {

   getVueRules: function(vueVersion) {
      // Always start with the base rules
      let ruleSets = [ {}, vueRulesBase ];

      // Add in version dependent rules
      switch (vueVersion) {
         case 2: {
            ruleSets = ruleSets.concat([
               vueRulesEssentials,
               vueRulesStronglyRecommended,
               vueRulesRecommended,
               silvermineRulesVue2Only,
            ]);
            break;
         }

         case 3: {
            ruleSets = ruleSets.concat([
               vue3RulesEssentials,
               vue3RulesStronglyRecommended,
               vue3RulesRecommended,
               silvermineRulesVue3Only,
            ]);
            break;
         }

         default: {
            throw new Error(`Unsupported Vue version: ${vueVersion}`);
         }
      }

      // Lastly, always add our custom rules.
      ruleSets.push(silvermineRulesUniversal);

      // Assemble into an object ready to be passed to eslint.
      return Object.assign.apply(Object, ruleSets);
   },
};
