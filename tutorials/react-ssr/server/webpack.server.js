const path = require('path');

module.exports = {
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

    // tell Webpack to run Babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        ['env', { targets: { browsers: ['last 2 versions'] } }]
                    ]
                }
            }
        ]
    }
};
