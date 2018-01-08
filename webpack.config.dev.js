const { baseConfig, commonExtract, lessExtract } = require('./webpack.config.base');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/bundle.css',
  allChunks: true,
  disable: false,
});
const antdCSS = new ExtractTextPlugin({
  filename: 'assets/antd.css',
  allChunks: true,
  disable: false,
});

module.exports = Object.assign({}, baseConfig, {
  devtool: false, // 'source-map',
  output: Object.assign({}, baseConfig.output, {
    filename: 'assets/[name].bundle.js',
    chunkFilename: 'assets/[name].chunk.js',
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
          name: 'images/[name].[ext]',
        },
      },
    ]),
  }),
  plugins: baseConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),
    antdCSS,
    extractCSS,
  ]),
});
