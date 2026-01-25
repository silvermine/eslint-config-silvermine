/**
 * @fileoverview Ensures that all files are modules (either import or export)
 */
import type { Rule } from 'eslint';
import type { Program } from 'estree';

const rule: Rule.RuleModule = {

   meta: {
      schema: [],
   },

   create(context) {
      return {
         Program(node: Program) {
            const importExportRegex = /^(TS)?(Exp|Imp).*(Declaration|Assignment)$/;

            const hasImportExport = node.body.some((subNode) => {
               return importExportRegex.test(subNode.type);
            });

            if (!hasImportExport) {
               context.report({
                  node,
                  message: 'All files must be modules (contain an import or export statement).',
               });
            }
         },
      };
   },

};

export default rule;
