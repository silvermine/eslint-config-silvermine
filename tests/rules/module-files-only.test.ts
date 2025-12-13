/**
* @fileoverview Check that all files are modules (either import or export)
*/
import { describe, it } from 'vitest';
import rule from '../../src/plugin/rules/module-files-only.js';
import formatCode from '../code-helper.js';
import { typeScript } from '../rule-testers.js';

const ruleTester = typeScript();

const validImportOnly = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();'
);

const validExportOnly = formatCode(
   'export const MY_CONST = 1;'
);

const validImportAndExport = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();',
   'export default someDefault();'
);

const validImportAndExportEq = formatCode(
   'import someDefault from \'someModule\';',
   '',
   'someDefault();',
   'export = someDefault();'
);

const validExportEqOnly = formatCode(
   'export = {',
   '   a: 1,',
   '}'
);

const validImportEqOnly = formatCode(
   'import something = require(\'something\');',
   '',
   'something();'
);

const invalidExample = formatCode(
   'var a = 2;'
);


describe('module-files-only', () => {
   it('should pass RuleTester tests', () => {
      ruleTester.run('module-files-only', rule, {
         valid: [
            validImportOnly,
            validExportOnly,
            validImportAndExport,
            validImportAndExportEq,
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
   });
});
