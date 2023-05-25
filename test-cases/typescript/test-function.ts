const GLOBALLY_DEFINED = 'test';

/**
 * Test function that adheres to our ESLint rules for TypeScript
 * @param argument
 */
export default function testFunction(argument: string): string {
   const locallyDefinedConst = 'test',
         returnValue = argument + locallyDefinedConst;

   return returnValue + GLOBALLY_DEFINED;
}
