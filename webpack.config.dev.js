const { baseConfig } = require('./webpack.config.base');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: Object.assign({}, baseConfig.output, {
    filename: 'assets/[name].bundle.js',
    chunkFilename: 'assets/[name].chunk.js',
  }),
  module: Object.assign({}, baseConfig.module, {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(ico|png|mp3|wav|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          limit: 0,
          name: 'images/[name].[ext]',
        },
      },
    ]),
  }),
  plugins: baseConfig.plugins.concat([
    new HardSourceWebpackPlugin(),
  ]),
});
