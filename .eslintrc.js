module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        'no-trailing-spaces': ['error'],
        semi: ['off'],
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/no-extra-semi': ['error'],
        quotes: ['off'],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/ban-types': ['error', {
            types: {
                Object: {
                    message: 'Avoid using the `Object` type. Did you mean `object`?',
                    fixWith: 'object'
                },
                Function: {
                    message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    fixWith: 'function'
                },
                Boolean: {
                    message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    fixWith: 'boolean'
                },
                Number: {
                    message: 'Avoid using the `Number` type. Did you mean `number`?',
                    fixWith: 'number'
                },
                String: {
                    message: 'Avoid using the `String` type. Did you mean `string`?',
                    fixWith: 'string'
                },
                Symbol: {
                    message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    fixWith: 'symbol'
                },
            }
        }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'none',
                requireLast: false,
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        '@typescript-eslint/naming-convention': ['error', {
            selector: 'enum',
            format: ['UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
        }, {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
        }],
        '@typescript-eslint/array-type': ['error', {
            default: 'array-simple',
            readonly: 'array-simple'
        }]
    },
}