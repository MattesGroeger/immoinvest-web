const assign = require('object-assign');
const webpack = require('webpack');
const common = require('./common');

const config = assign(common.config, {
  devtool: false
});

config.plugins = [
  // Setup global variables
  common.plugins.isClient,
  common.plugins.processEnv,

  // optimizations
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = config;
