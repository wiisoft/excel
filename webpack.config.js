const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    // client
    {
        mode: 'development',
        context: path.join(__dirname, 'src'),
        entry: './main.ts',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'dist')
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            watchContentBase: true,
            compress: true,
            port: 4200
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(s*)css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Development',
                template: './index.html'
            }),
            new ExtractTextPlugin('style.css')
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },

    },
    // server
];
