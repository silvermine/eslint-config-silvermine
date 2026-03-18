/**
* @fileoverview Check that all files are modules (either import or export)
*/
'use strict';

var rule = require('../../rules/module-files-only'),
    formatCode = require('../code-helper'),
    ruleTester = require('../ruleTesters').typeScript(),
    invalidExample, validImportOnly, validExportOnly, validImportAndExport, validExportEqOnly, validImportEqOnly;

validImportOnly = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();'
);

validExportOnly = formatCode(
   'export const MY_CONST = 1;'
);

validImportOnly = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();',
   'export default someDefault();'
);

validImportAndExport = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();',
   'export = someDefault();'
);

validExportEqOnly = formatCode(
   'export = {',
   '   a: 1,',
   '}'
);

validImportEqOnly = formatCode(
   'import something = require(\'something\');',
   '',
   'something();'
);

invalidExample = formatCode(
   'var a = 2;'
);


ruleTester.run('module-files-only', rule, {
   valid: [
      validImportOnly,
      validExportOnly,
      validImportAndExport,
      validExportEqOnly,
      validImportEqOnly,
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'All files must be modules (contain an import or export statement).',
               type: 'Program',
            },
         ],
      },
   ],
});
