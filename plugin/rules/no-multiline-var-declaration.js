/**
 * @fileoverview Ensures that array and object instatiations do not span multiple lines
 */

'use strict';

var ALLOWED_OPTIONS = [ true, false, 'never', 'single-only', 'allow' ],
    DEFAULT_OPTIONS;

DEFAULT_OPTIONS = {
   'var': 'never',
   'let': 'never',
   'const': 'never',
};

module.exports = {

   meta: {
      schema: [
         {
            type: 'object',
            properties: {
               'var': {
                  'enum': ALLOWED_OPTIONS,
               },
               'let': {
                  'enum': ALLOWED_OPTIONS,
               },
               'const': {
                  'enum': ALLOWED_OPTIONS,
               },
            },
         },
      ],
   },

   create: function(context) {
      var options;

      options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };

      function validateVar(node) {
         if (node.loc.start.line !== node.loc.end.line) {
            context.report({
               node: node,
               message: 'Variable declaration for {{ identifier }} should not span multiple lines.',
               data: {
                  identifier: node.id.name,
               },
            });
         }
      }

      function shouldValidate(option, declarations) {
         if (option === 'never' || option === true) {
            return true;
         }

         if (option === 'single-only' && declarations.length > 1) {
            return true;
         }

         return false;
      }

      function validateDeclaration(node) {
         var kindOption = options[node.kind];

         if (shouldValidate(kindOption, node.declarations)) {
            node.declarations.forEach(function(decl) {
               validateVar(decl);
            });
         }
      }

      return {
         'VariableDeclaration': validateDeclaration,
      };
   },

};
