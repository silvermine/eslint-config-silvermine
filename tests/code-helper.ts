/**
 * @fileoverview Sugar syntax for making code templates easier to read
 */

export default function code(...lines: string[]): string {
   return '\n' + lines.join('\n') + '\n';
}
