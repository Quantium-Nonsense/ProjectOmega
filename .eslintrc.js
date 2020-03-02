module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    ignorePatterns: [
        "*.scss",
        "*.ico",    ],
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            plugins: [
                "import",
                "prefer-arrow",
                "@angular-eslint",
                "@typescript-eslint",
                "@typescript-eslint/tslint",
                "jsdoc"
            ],
            extends: [
                "plugin:jsdoc/recommended",
            ],
            rules: {
                "@angular-eslint/component-class-suffix": "error",
                "@angular-eslint/component-selector": [
                    'error',
                    {type: 'element', prefix: 'app', style: 'kebab-case'}
                ],
                "@angular-eslint/contextual-lifecycle": "error",
                // This rule has not yet been converted
                // "@angular-eslint/directive-class-suffix": "error",
                "@angular-eslint/directive-selector": [
                    'error',
                    {type: 'attribute', prefix: 'app', style: 'camelCase'}
                ],
                // This rule's conversion has not yet been released
                // "@angular-eslint/no-conflicting-lifecycle": 'error',
                '@angular-eslint/no-host-metadata-property': 'error',
                // This rule has not yet been converted
                // '@angular-eslint/no-input-rename': 'error',
                '@angular-eslint/no-inputs-metadata-property': 'error',
                '@angular-eslint/no-output-native': 'error',
                '@angular-eslint/no-output-on-prefix': 'error',
                '@angular-eslint/no-output-rename': 'error',
                '@angular-eslint/no-outputs-metadata-property': 'error',
                '@angular-eslint/use-lifecycle-interface': 'warn',
                '@angular-eslint/use-pipe-transform-interface': 'error',
                "@typescript-eslint/adjacent-overload-signatures": "error",
                "@typescript-eslint/array-type": "off",
                "@typescript-eslint/ban-types": "error",
                "@typescript-eslint/class-name-casing": "error",
                "@typescript-eslint/consistent-type-assertions": "error",
                "@typescript-eslint/explicit-member-accessibility": [
                    "off",
                    {
                        "accessibility": "explicit"
                    }
                ],
                "@typescript-eslint/interface-name-prefix": "off",
                "@typescript-eslint/member-ordering": "error",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-empty-interface": "error",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-inferrable-types": "error",
                "@typescript-eslint/no-misused-new": "error",
                "@typescript-eslint/no-namespace": "error",
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-parameter-properties": "off",
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-function-type": "error",
                "@typescript-eslint/prefer-namespace-keyword": "error",
                "@typescript-eslint/quotes": [
                    "error",
                    "single"
                ],
                "@typescript-eslint/triple-slash-reference": "error",
                "@typescript-eslint/unified-signatures": "error",
                "arrow-parens": [
                    "off",
                    "as-needed"
                ],
                "camelcase": "error",
                "comma-dangle": "off",
                "complexity": "off",
                "constructor-super": "error",
                "dot-notation": "error",
                "eqeqeq": [
                    "error",
                    "smart"
                ],
                "guard-for-in": "error",
                "id-blacklist": [
                    "error",
                    "any",
                    "Number",
                    "number",
                    "String",
                    "string",
                    "Boolean",
                    "boolean",
                    "Undefined",
                    "undefined"
                ],
                "id-match": "error",
                "import/no-deprecated": "warn",
                "import/order": "off",
                "jsdoc/no-types": "error",
                "max-classes-per-file": "off",
                "max-len": [
                    "error",
                    {
                        "code": 140
                    }
                ],
                "new-parens": "error",
                "no-bitwise": "error",
                "no-caller": "error",
                "no-cond-assign": "error",
                "no-console": [
                    "error",
                    {
                        "allow": [
                            "log",
                            "dirxml",
                            "warn",
                            "error",
                            "dir",
                            "timeLog",
                            "assert",
                            "clear",
                            "count",
                            "countReset",
                            "group",
                            "groupCollapsed",
                            "groupEnd",
                            "table",
                            "Console",
                            "markTimeline",
                            "profile",
                            "profileEnd",
                            "timeline",
                            "timelineEnd",
                            "timeStamp",
                            "context"
                        ]
                    }
                ],
                "no-debugger": "error",
                "no-empty": "off",
                "no-eval": "error",
                "no-fallthrough": "error",
                "no-invalid-this": "off",
                "no-multiple-empty-lines": "off",
                "no-new-wrappers": "error",
                "no-restricted-imports": [
                    "error",
                    "rxjs/Rx"
                ],
                "no-shadow": [
                    "error",
                    {
                        "hoist": "all"
                    }
                ],
                "no-throw-literal": "error",
                "no-trailing-spaces": "error",
                "no-undef-init": "error",
                "no-underscore-dangle": "error",
                "no-unsafe-finally": "error",
                "no-unused-expressions": "error",
                "no-unused-labels": "error",
                "no-var": "error",
                "object-shorthand": "error",
                "one-var": [
                    "error",
                    "never"
                ],
                "prefer-arrow/prefer-arrow-functions": "error",
                "prefer-const": "error",
                "quote-props": [
                    "error",
                    "as-needed"
                ],
                "radix": "error",
                "spaced-comment": "error",
                "use-isnan": "error",
                "valid-typeof": "off",
                "@typescript-eslint/tslint/config": [
                    "error",
                    {
                        "rules": {
                            "directive-class-suffix": true,
                            "jsdoc-format": true,
                            "no-conflicting-lifecycle": true,
                            "no-reference-import": true,
                            "template-no-negated-async": true,
                            "use-lifecycle-interface": true,
                            "use-pipe-transform-interface": true
                        }
                    },
                ],
            },
        },
        {
            files: ['*.html'],
            parser: '@angular-eslint/template-parser',
            plugins: ['@angular-eslint/template'],
            rules: {
                '@angular-eslint/template/banana-in-a-box': 'error',
            },
        }
    ]
};
