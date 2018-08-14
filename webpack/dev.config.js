const WriteFilePlugin = require('write-file-webpack-plugin');

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

const webpackConfig = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    background: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/background.js')],
    popup: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/popup.js')],
    options: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/options.js')],
    window: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/window.js')],
    gmail_content_script: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/gmail_content_script.js')],
    gmail_injection_script: [customPath, hotScript, path.join(__dirname, '../src/chrome/js/gmail_injection_script.js')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true
    },
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr'
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new WriteFilePlugin({
      test: (file) => { 
        return [
          'gmail_content_script.bundle.js',
          'gmail_injection_script.bundle.js'
        ].includes(file);
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
      options: {
        presets: ['react-hmre']
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
