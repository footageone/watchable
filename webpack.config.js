const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/watchable.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Watchable',
        libraryTarget: 'umd'
    }
};
