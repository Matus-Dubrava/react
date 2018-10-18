const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // inform Webpack that we are building bunde for
    // nodeJS, rather than for the browser
    target: 'node',

    // tell Webpack the root file of our server application
    entry: './src/index.js',

    // tell Webpack where to put the output file that
    // is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
