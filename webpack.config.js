const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'), 
        },
        compress: true,
        host: 'localhost',
        port: 8080, // Port for the development server
        hot: false, // Enable hot module replacement
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
