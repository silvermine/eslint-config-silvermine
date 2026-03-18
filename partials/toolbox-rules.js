'use strict';

const COMPARISON_OPS = [ '===', '!==', '==', '!=' ],
      EQUALITY_OPS = [ '===', '==' ],
      INEQUALITY_OPS = [ '!==', '!=' ];

const TYPEOF_HELPERS = {
   'string': '`isString`',
   'boolean': '`isBoolean`',
   'number': '`isNumber`',
   'function': '`isFunction`',
   'undefined': '`isUndefined`',
   'object': '`isObject`, `isStringMap`, or `isStringUnknownMap`',
};

const localPlugin = {
   rules: {
      'no-in-operator': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               BinaryExpression(node) {
                  if (node.operator === 'in') {
                     context.report({
                        node,
                        message: 'Use `hasDefined` from `@silvermine/toolbox` instead of the `in` operator.',
                     });
                  }
               },
            };
         },
      },

      'no-typeof-check': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               BinaryExpression(node) {
                  const isComparisonOp = COMPARISON_OPS.includes(node.operator),
                        isTypeofLeft = node.left.type === 'UnaryExpression' && node.left.operator === 'typeof',
                        isTypeofRight = node.right.type === 'UnaryExpression' && node.right.operator === 'typeof',
                        isLiteralRight = node.right.type === 'Literal',
                        isLiteralLeft = node.left.type === 'Literal';

                  if (!isComparisonOp) {
                     return;
                  }

                  let typeValue = null;

                  if (isTypeofLeft && isLiteralRight) {
                     typeValue = node.right.value;
                  } else if (isTypeofRight && isLiteralLeft) {
                     typeValue = node.left.value;
                  }

                  if (!typeValue || !TYPEOF_HELPERS[typeValue]) {
                     return;
                  }

                  context.report({
                     node,
                     message: 'Use ' + TYPEOF_HELPERS[typeValue] + ' from `@silvermine/toolbox` instead of `typeof` checks.',
                  });
               },
            };
         },
      },

      'prefer-is-empty': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               BinaryExpression(node) {
                  const isEqualityOp = EQUALITY_OPS.includes(node.operator),
                        isInequalityOp = INEQUALITY_OPS.includes(node.operator),
                        leftIsLength = node.left.type === 'MemberExpression' && node.left.property.name === 'length',
                        rightIsZero = node.right.type === 'Literal' && node.right.value === 0,
                        rightIsLength = node.right.type === 'MemberExpression' && node.right.property.name === 'length',
                        leftIsZero = node.left.type === 'Literal' && node.left.value === 0,
                        isLengthVsZero = (leftIsLength && rightIsZero) || (rightIsLength && leftIsZero);

                  if (!isLengthVsZero) {
                     return;
                  }

                  if (isEqualityOp) {
                     context.report({
                        node,
                        message: 'Use `isEmpty` from `@silvermine/toolbox` instead of `.length === 0`.',
                     });
                  } else if (isInequalityOp) {
                     context.report({
                        node,
                        message: 'Use `!isEmpty(...)` from `@silvermine/toolbox` instead of `.length !== 0`.',
                     });
                  }
               },
            };
         },
      },

      'prefer-compact': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               CallExpression(node) {
                  const isFilter = node.callee.type === 'MemberExpression'
                     && node.callee.property.type === 'Identifier'
                     && node.callee.property.name === 'filter';

                  const hasSingleBooleanArg = node.arguments.length === 1
                     && node.arguments[0].type === 'Identifier'
                     && node.arguments[0].name === 'Boolean';

                  if (isFilter && hasSingleBooleanArg) {
                     context.report({
                        node,
                        message: 'Use `compact` from `@silvermine/toolbox` instead of `.filter(Boolean)`.',
                     });
                  }
               },
            };
         },
      },

      'prefer-is-array': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               CallExpression(node) {
                  const isArrayIsArray = node.callee.type === 'MemberExpression'
                     && node.callee.object.type === 'Identifier'
                     && node.callee.object.name === 'Array'
                     && node.callee.property.type === 'Identifier'
                     && node.callee.property.name === 'isArray';

                  if (isArrayIsArray) {
                     context.report({
                        node,
                        message: 'Use `isArray` from `@silvermine/toolbox` instead of `Array.isArray()`.',
                     });
                  }
               },
            };
         },
      },

      'no-null-check': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               BinaryExpression(node) {
                  const isStrictOp = node.operator === '===' || node.operator === '!==',
                        leftIsNull = node.left.type === 'Literal' && node.left.raw === 'null',
                        rightIsNull = node.right.type === 'Literal' && node.right.raw === 'null';

                  if (!isStrictOp || (!leftIsNull && !rightIsNull)) {
                     return;
                  }

                  const suggestion = node.operator === '!=='
                     ? '`!isNull`'
                     : '`isNull`';

                  context.report({
                     node,
                     message: 'Use ' + suggestion + ' from `@silvermine/toolbox` instead of null equality checks.',
                  });
               },
            };
         },
      },

      'no-undefined-check': {
         meta: { type: 'suggestion', schema: [] },
         create(context) {
            return {
               BinaryExpression(node) {
                  const isStrictOp = node.operator === '===' || node.operator === '!==',
                        leftIsUndefined = node.left.type === 'Identifier' && node.left.name === 'undefined',
                        rightIsUndefined = node.right.type === 'Identifier' && node.right.name === 'undefined';

                  if (!isStrictOp || (!leftIsUndefined && !rightIsUndefined)) {
                     return;
                  }

                  const suggestion = node.operator === '!=='
                     ? '`!isUndefined`'
                     : '`isUndefined`';

                  context.report({
                     node,
                     message: 'Use ' + suggestion + ' from `@silvermine/toolbox` instead of undefined equality checks.',
                  });
               },
            };
         },
      },
   },
};

// These rules are enabled by default. Projects that do not use @silvermine/toolbox
// can disable them by overriding the rules in their eslint.config.js, e.g.:
//
//    import silvermineConfig from '@silvermine/eslint-config';
//
//    export default [
//       ...silvermineConfig,
//       {
//          rules: {
//             '@silvermine/toolbox/no-in-operator': 'off',
//             '@silvermine/toolbox/no-typeof-check': 'off',
//             '@silvermine/toolbox/prefer-is-empty': 'off',
//             '@silvermine/toolbox/prefer-compact': 'off',
//             '@silvermine/toolbox/prefer-is-array': 'off',
//             '@silvermine/toolbox/no-null-check': 'off',
//             '@silvermine/toolbox/no-undefined-check': 'off',
//          },
//       },
//    ];
module.exports = [
   {
      files: [ '**/*.{js,ts,vue}' ],
      plugins: { '@silvermine/toolbox': localPlugin },
      rules: {
         '@silvermine/toolbox/no-in-operator': 'warn',
         '@silvermine/toolbox/no-typeof-check': 'warn',
         '@silvermine/toolbox/prefer-is-empty': 'warn',
         '@silvermine/toolbox/prefer-compact': 'warn',
         '@silvermine/toolbox/prefer-is-array': 'warn',
         '@silvermine/toolbox/no-null-check': 'warn',
         '@silvermine/toolbox/no-undefined-check': 'warn',
      },
   },
];
