module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: [ 'jasmine', 'source-map-support' ],
        files: [
            { pattern: 'src/**/*.spec.ts', watched: false }
        ],
        preprocessors: {
            'src/**/*.spec.ts': [ 'webpack' ],
            'src/watchable.ts': [ 'webpack', 'coverage' ]
        },
        webpack: {
            mode: 'development',
            devtool: '#inline-source-map',
            resolve: {
                extensions: [ '.ts', '.js' ]
            },
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        enforce: 'post',
                        test: /\.ts$/,
                        use: 'istanbul-instrumenter-loader',
                        exclude: [
                            'node_modules',
                            /\.spec\.ts$/
                        ]
                    }
                ]
            },
        },
        webpackMiddleware: {
            noInfo: true
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        /*
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            bundlerOptions: {
                // set *.spec.ts files as entrypoints
                // for correct code coverage
                entrypoints: /\.spec\.ts$/
            },
            coverageOptions: {
                // exclude the index.ts and *.spec.ts files
                // for correct code coverage
                exclude: [/index\.ts$/, /\.spec\.ts$/]
            },
            reports: {
                html: 'coverage',
                text: ''
            },
            compilerOptions: {
                baseUrl: '.',
            }
        },

        */
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                { type : 'text-summary' },
                { type: 'html', dir: 'coverage' },
            ]
        },

        browsers: ['Chrome']
    });
};
