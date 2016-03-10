require('dotenv').load();

const assign = require('object-assign');
const webpack = require('webpack');
const common = require('./common');

const config = assign(common.config, {
  devtool: 'eval-source-map'
});

config.output.path = './public';
config.output.filename = 'bundle.js';

config.plugins = [
  // Fail build if there's errors:
  new webpack.NoErrorsPlugin(),
  // Setup variables
  common.plugins.isClient,
  common.plugins.processEnv
];

module.exports = config;
