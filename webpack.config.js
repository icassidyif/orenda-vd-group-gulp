const path = require('path')

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules|vendor/,
                    chunks: 'all',
                    enforce: true,
                    name: 'vendor',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    useBuiltIns: 'usage',
                                    corejs: '3.9.1',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '@modules': path.resolve(__dirname, 'src/blocks/modules'),
            '@components': path.resolve(__dirname, 'src/blocks/components'),
            '@vendor': path.resolve(__dirname, 'src/js/vendor'),
        },
    },
}
