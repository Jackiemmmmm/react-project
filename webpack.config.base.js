const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ifProduction } = getIfUtils(process.env.NODE_ENV); // , ifNotProduction

const extractCSS = new ExtractTextPlugin({
  filename: ifProduction('assets/bundle.css?v=[contenthash]', 'assets/bundle.css'),
  allChunks: true,
  disable: false,
});
const antdCSS = new ExtractTextPlugin({
  filename: ifProduction('assets/bundle.css?v=[contenthash]', 'assets/bundle.css'),
  allChunks: true,
  disable: false,
});
const commonExtract = {
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        minimize: true,
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]',
      },
    },
    'postcss-loader',
  ],
};

const lessExtract = {
  fallback: 'style-loader',
  use: [
    'css-loader',
    'less-loader',
  ],
};

module.exports = {
  devtool: ifProduction(false, 'source-map'),
  output: {
    filename: ifProduction('assets/[name].bundle.js?v=[hash]', '[name].bundle.js'),
    chunkFilename: ifProduction('assets/[id].chunk.js?v=[chunkhash]', '[name].chunk.js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        use: extractCSS.extract(commonExtract),
      },
      {
        test: /\.less$/,
        use: antdCSS.extract(lessExtract),
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: resolve('src/fonts'),
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(ico|png|mp3|wav|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: ifProduction('images/[name].[ext]?v=[hash:base64:5]', 'images/[name].[ext]'),
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          'svg-react-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // section to check source files, not modified by other loaders
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    modules: [
      resolve('src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: removeEmpty([
    // ifNotProduction(new BundleAnalyzerPlugin()),
    ifProduction(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // display warnings when dropping unreachable code or unused declarations etc
          warnings: false,
          // Pass true to discard calls to console.* functions
          drop_console: true,
          // apply optimizations for if-s and conditional expressions
          conditionals: true,
          // drop unreferenced functions and variables
          unused: true,
          // remove unreachable code
          dead_code: true,
          // optimizations for if/return and if/continue
          if_return: true,
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: ifProduction('assets/vendor.bundle.js?v=[chunkhash]', 'vendor.bundle.js'),
    }),
    extractCSS,
    antdCSS,
  ]),
};
