const webpack = require('webpack'),
      path = require('path'),
      { env } = require('yargs').argv;

const DEV = env !== 'production';

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', './src/server/server.js'],
  output: {
    path: path.resolve(__dirname, 'public/server'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  externals: (context, request, callback) => {
    // Externalize all npm modules.
    if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
};