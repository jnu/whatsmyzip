/*eslint-env node */

var path = require('path');

var DEBUG = process.env.NODE_ENV !== 'production';

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
        filename: 'bundle.js'
    },

    debug: DEBUG,

    devtool: DEBUG ? 'source-map' : null
};



module.exports = config;

