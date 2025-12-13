/**
 * @fileoverview Ensures uninitialized variables come last in the variable declaration
 * chain
 */
import type { Rule } from 'eslint';
import type { VariableDeclaration } from 'estree';

const rule: Rule.RuleModule = {

   meta: {
      schema: [],
   },

   create(context) {
      function validateVar(node: VariableDeclaration): void {
         if (!node.declarations || node.declarations.length <= 1) {
            return;
         }

         const initialized = node.declarations.filter((decl) => {
            return decl.init !== null;
         });

         const uninitialized = node.declarations.filter((decl) => {
            return decl.init === null;
         });

         if (initialized.length > 0 && uninitialized.length > 0) {
            const lastInit = initialized[initialized.length - 1],
                  firstUninit = uninitialized[0],
                  lastInitIdx = node.declarations.indexOf(lastInit),
                  firstUninitIdx = node.declarations.indexOf(firstUninit);

            if (firstUninitIdx < lastInitIdx) {
               context.report({
                  node,
                  message: 'Uninitialized variables should come last in the declaration.',
               });
            }
         }
      }

      return {
         VariableDeclaration: validateVar,
      };
   },

};

export default rule;
