const esModules = ['@angular', '@ngrx', '@clr', '@cds', '@lit' ];

module.exports = {
    preset: 'jest-preset-angular',
    reporters: ['default'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            diagnostics: false,
            stringifyContentPathRegex: '\\.html$',
            astTransformers: [
                '<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer',
            ],
        },
      Uint8Array: Uint8Array,
    },
    modulePathIgnorePatterns: [
        'npm-cache',
        'npm_cache',
        '.npm',
        'cache',
        'cypress/*',
        'packages/core/package.json',
        '/examples/*',
        '/dist/*',
    ],
  transformIgnorePatterns: ['node_modules/(?!@angular|@cds|@clr|@lit|lit|ramda)'],
};
