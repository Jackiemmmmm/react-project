const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

const { ifProduction } = getIfUtils(process.env.NODE_ENV); // , ifNotProduction

const extractCSS = new ExtractTextPlugin({
  filename: ifProduction('assets/bundle.css?v=[contenthash:5]', 'assets/bundle.css'),
  allChunks: true,
  disable: false,
});
const antdCSS = new ExtractTextPlugin({
  filename: ifProduction('assets/antd.css?v=[contenthash:5]', 'assets/antd.css'),
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
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        minimize: true,
        importLoaders: 1,
        localIdentName: '[local]',
      },
    },
    'less-loader',
  ],
};

module.exports = {
  devtool: ifProduction(false, 'source-map'),
  output: {
    filename: ifProduction('assets/[name].bundle.js?v=[hash:5]', '[name].bundle.js'),
    chunkFilename: ifProduction('assets/[id].chunk.js?v=[chunkhash:5]', '[name].chunk.js'),
  },
  module: {
    rules: [
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
          name: ifProduction('images/[name].[ext]?v=[hash:5]', 'images/[name].[ext]'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: ifProduction('assets/vendor.bundle.js?v=[hash:5]', 'vendor.bundle.js'),
    }),
    ifProduction(new ClosureCompilerPlugin({
      compiler: {
        charset: 'utf-8',
        create_source_map: true,
        language_in: 'ECMASCRIPT5_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
      },
    })),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    antdCSS,
    extractCSS,
    new BundleAnalyzerPlugin(),
  ]),
};
