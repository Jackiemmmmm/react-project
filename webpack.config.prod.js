const { baseConfig, commonExtract, lessExtract } = require('./webpack.config.base');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/bundle.css?v=[contenthash:5]',
  allChunks: true,
  disable: false,
});
const antdCSS = new ExtractTextPlugin({
  filename: 'assets/antd.css?v=[contenthash:5]',
  allChunks: true,
  disable: false,
});

module.exports = Object.assign({}, baseConfig, {
  devtool: false, // 'source-map',
  output: Object.assign({}, baseConfig.output, {
    filename: 'assets/[name].bundle.js?v=[hash:5]',
    chunkFilename: 'assets/[id].chunk.js?v=[chunkhash:5]',
  }),
  module: Object.assign({}, baseConfig.module, {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.less$/,
        use: antdCSS.extract(lessExtract),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract(commonExtract),
      },
      {
        test: /\.(ico|png|mp3|wav|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[ext]?v=[hash:5]',
        },
      },
    ]),
  }),
  plugins: baseConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/vendor.bundle.js?v=[hash:5]',
    }),
    new ClosureCompilerPlugin({
      compiler: {
        charset: 'utf-8',
        create_source_map: true,
        language_in: 'ECMASCRIPT5_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
      },
    }),
    antdCSS,
    extractCSS,
    new OfflinePlugin({
      appShell: '/',
      version: '[hash]',
      AppCache: false,
      ServiceWorker: {
        minify: true,
      },
    }),
  ]),
});
