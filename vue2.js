'use strict';

const baseConfig = require('./index'),
      getVueRules = require('./partials/vue').getVueRules;

// Get all the base overrides, except for the chunk related to Vue (3). We'll replace the
// Vue 3 rules with Vue 2 rules.
const overrides = baseConfig.overrides.map((override) => {
   if (override.parser !== 'vue-eslint-parser') {
      return override;
   }
   return Object.assign(
      {},
      override,
      {
         rules: getVueRules(2),
      }
   );
});

module.exports = Object.assign(
   {},
   baseConfig,
   {
      overrides: overrides,
   }
);
