module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
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
            extendDefaults: true,
            types: {
                /**
                 * we are using `{}` as noop, such as:
                 * `type A<P> = B & (P extends Q ? C : {})`
                 * gets `B & C` when `P extends Q` and `B` otherwise
                 */
                '{}': false
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
        }],
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],
    },
}