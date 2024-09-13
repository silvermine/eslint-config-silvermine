'use strict';

const baseConfig = require('./index'),
      getVueRules = require('./partials/vue').getVueRules;

// Get all the base overrides, except for the chunk related to Vue (3). We'll replace the
// Vue 3 rules with Vue 2 rules.
const overrides = baseConfig.map((configObject) => {
   if (configObject.files && configObject.files !== [ '**/*.vue' ]) {
      return configObject;
   }
   return Object.assign(
      {},
      {
         ...configObject,
         rules: getVueRules(2),
      }
   );
});

module.exports = {
   complete: overrides,
   discrete: {
      rules: getVueRules(2),
   },
};
