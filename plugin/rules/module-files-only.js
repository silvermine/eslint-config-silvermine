/**
 * @fileoverview Ensures that all files are modules (either import or export)
 */

'use strict';

module.exports = {

   meta: {
      type: 'suggestion',
      schema: [],
   },

   create: function(context) {
      return {
         Program: function(node) {
            var importExportRegex = /^(TS)?(Exp|Imp).*(Declaration|Assignment)$/,
                hasImportExport;

            hasImportExport = node.body.some(function(subNode) {
               return importExportRegex.test(subNode.type);
            });

            if (!hasImportExport) {
               context.report({
                  node: node,
                  message: 'All files must be modules (contain an import or export statement).',
               });
            }
         },
      };
   },

};
