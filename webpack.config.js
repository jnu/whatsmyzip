/*eslint-env node */

var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var DEBUG = process.env.NODE_ENV !== 'production';

var plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve('src', 'html', 'popup.html'),
        minify: !DEBUG && {
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true
        },
        inject: 'body'
    })
];

if (!DEBUG) {
    plugins.push(new UglifyJsPlugin());
}

var config = {

    context: path.join(__dirname, 'src', 'js'),

    entry: {
        'whatsmyzip': './main.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?cacheDirectory' }
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle' + (DEBUG ? '' : '.min') + '.js'
    },

    debug: DEBUG,

    plugins: plugins,

    devtool: DEBUG ? 'source-map' : null
};



module.exports = config;

