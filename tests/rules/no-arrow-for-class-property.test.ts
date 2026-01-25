/**
* @fileoverview Check that arrow functions are not used for class properties.
*/
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/no-arrow-for-class-property.js';
import formatCode from '../code-helper.js';
import { typeScript } from '../rule-testers.js';

const ruleTester = typeScript();

const validExample = formatCode(
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

const invalidExample = formatCode(
   'class Adder {',
   '   constructor(private _a: number) {}',
   '   add = (b: number): number => {',
   '       return this._a + b;',
   '   }',
   '}'
);


describe('no-arrow-for-class-property', () => {
   it('should pass RuleTester tests', () => {
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
   });
});
