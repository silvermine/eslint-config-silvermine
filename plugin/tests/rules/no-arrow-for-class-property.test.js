/**
* @fileoverview Check that arrow functions are not used for class properties.
*/
'use strict';

var rule = require('../../rules/no-arrow-for-class-property'),
    formatCode = require('../code-helper'),
    ruleTester = require('../ruleTesters').typeScript(),
    invalidExample, validExample;

validExample = formatCode(
   'class Adder {',
   '   constructor(private _a: number) {}',
   '   add(b: number): number {',
   '       return this._a + b;',
   '   }',
   '   functionWithArrow() {',
   '      return (c: number): void => {',
   '         this._a += c;',
   '       };',
   '   }',
   '}'
);

invalidExample = formatCode(
   'class Adder {',
   '   constructor(private _a: number) {}',
   '   add = (b: number): number => {',
   '       return this._a + b;',
   '   }',
   '}'
);


ruleTester.run('no-arrow-for-class-property', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'Arrow functions should not be used for class properties.',
               type: 'PropertyDefinition',
            },
         ],
      },
   ],
});
