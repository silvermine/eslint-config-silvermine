/**
 * AST utility functions adapted from eslint/lib/rules/utils/ast-utils.js
 */
import type { AST } from 'eslint';

type Token = AST.Token;

/**
 * Checks if the given token is a semicolon token or not.
 */
export function isSemicolonToken(token: Token): boolean {
   return token.value === ';' && token.type === 'Punctuator';
}

/**
 * Checks if the given token is NOT a semicolon token.
 */
export function isNotSemicolonToken(token: Token): boolean {
   return !isSemicolonToken(token);
}

/**
 * Determines whether two adjacent tokens are on the same line.
 */
export function isTokenOnSameLine(left: Token, right: Token): boolean {
   return left.loc.end.line === right.loc.start.line;
}

export const STATEMENT_LIST_PARENTS = new Set([
   'Program',
   'BlockStatement',
   'StaticBlock',
   'SwitchCase',
]);
