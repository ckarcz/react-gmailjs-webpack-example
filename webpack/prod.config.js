const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const customPath = path.join(__dirname, './customPublicPath');

const webpackConfig = {
  entry: {
    background: [customPath, path.join(__dirname, '../src/chrome/js/background.js')],
    popup: [customPath, path.join(__dirname, '../src/chrome/js/popup.js')],
    options: [customPath, path.join(__dirname, '../src/chrome/js/options.js')],
    window: [customPath, path.join(__dirname, '../src/chrome/js/window.js')],
    gmail_content_script: [customPath, path.join(__dirname, '../src/chrome/js/gmail_content_script.js')],
    gmail_injection_script: [customPath, path.join(__dirname, '../src/chrome/js/gmail_injection_script.js')],
  },
  output: {
    path: path.join(__dirname, '../prod/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react-optimize']
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer]
          }
        }
      ]
    }]
  }
};

module.exports = [
  webpackConfig
];
