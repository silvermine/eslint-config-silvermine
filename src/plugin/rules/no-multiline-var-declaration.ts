/**
 * @fileoverview Ensures that array and object instatiations do not span multiple lines
 */
import type { Rule } from 'eslint';
import type { VariableDeclaration, VariableDeclarator, Identifier } from 'estree';

type OptionValue = boolean | 'never' | 'single-only' | 'allow';

type Options = Record<string, OptionValue>;

const ALLOWED_OPTIONS: OptionValue[] = [ true, false, 'never', 'single-only', 'allow' ];

const DEFAULT_OPTIONS: Options = {
   'var': 'never',
   'let': 'never',
   'const': 'never',
};

const rule: Rule.RuleModule = {

   meta: {
      schema: [
         {
            type: 'object',
            properties: {
               'var': { enum: ALLOWED_OPTIONS },
               'let': { enum: ALLOWED_OPTIONS },
               'const': { enum: ALLOWED_OPTIONS },
            },
         },
      ],
   },

   create(context) {
      const userOptions = (context.options[0] || {}) as Options,
            options: Options = { ...DEFAULT_OPTIONS, ...userOptions };

      function validateVar(node: VariableDeclarator): void {
         if (!node.loc) {
            return;
         }

         if (node.loc.start.line !== node.loc.end.line) {
            context.report({
               node,
               message: 'Variable declaration for {{ identifier }} should not span multiple lines.',
               data: {
                  identifier: (node.id as Identifier).name,
               },
            });
         }
      }

      function shouldValidate(option: OptionValue, declarations: VariableDeclarator[]): boolean {
         if (option === 'never' || option === true) {
            return true;
         }

         if (option === 'single-only' && declarations.length > 1) {
            return true;
         }

         return false;
      }

      function validateDeclaration(node: VariableDeclaration): void {
         const kindOption = options[node.kind];

         if (shouldValidate(kindOption, node.declarations)) {
            node.declarations.forEach((decl) => {
               validateVar(decl);
            });
         }
      }

      return {
         VariableDeclaration: validateDeclaration,
      };
   },

};

export default rule;
