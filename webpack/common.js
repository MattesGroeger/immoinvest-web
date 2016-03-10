const webpack = require('webpack');
const path = require('path');

const SRC_ROOT = path.resolve(__dirname, '..', 'src');

exports.config = {
  progress: true,
  context: path.resolve(__dirname, '..'),
  devServer: {
      contentBase: "./public",
  },
  entry: './src/main.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    moduleDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  // This gets overriden by development and production specific configs
  plugins: [
  ]
};

exports.plugins = {
  isClient: new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
  processEnv: new webpack.DefinePlugin({
    'process.env': {
      // Mainly used to require CSS files with webpack, which can happen only on browser
      // Used as `if (process.env.BROWSER)...`
      BROWSER: JSON.stringify(true),
      // Useful to reduce the size of client-side libraries, e.g. react
      ENV: JSON.stringify(process.env.ENV),
      NODE_ENV: JSON.stringify(process.env.ENV),
    }
  })
};
