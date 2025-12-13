import type { Linter } from 'eslint';

const rules: Linter.RulesRecord = {
   'vue/no-deprecated-v-is': 'error',
   'vue/v-on-event-hyphenation': [ 'error', 'never' ],
};

export default rules;
