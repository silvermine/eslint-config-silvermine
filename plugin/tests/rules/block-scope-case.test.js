/**
* @fileoverview Check that all case statements are block scoped.
*/
'use strict';

var rule = require('../../rules/block-scope-case'),
    formatCode = require('../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample1, invalidExample2, invalidExample3, validExample1, validExample2;


validExample1 = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

validExample2 = formatCode(
   'switch (x) {',
   '   case 1:',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

invalidExample1 = formatCode(
   'switch (x) {',
   '   case 2: ',
   '      doSomethingWith2(x);',
   '      break;',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);

invalidExample2 = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);

invalidExample3 = formatCode(
   'switch (x) {',
   '   case 1:',
   '   case 2: ',
   '      doSomethingWith2(x);',
   '      break;',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

ruleTester.run('block-scope-case', rule, {
   valid: [
      validExample1,
      validExample2,
   ],

   invalid: [
      {
         code: invalidExample1,
         errors: [
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
         ],
      },
      {
         code: invalidExample2,
         errors: [
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
         ],
      },
      {
         code: invalidExample3,
         errors: [
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
         ],
      },
   ],
});
