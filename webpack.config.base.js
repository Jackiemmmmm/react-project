const webpack = require('webpack');
const { resolve } = require('path');
const { compile } = require('google-closure-compiler-js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);
const BASE_PATH = resolve(ROOT_PATH, 'src');
const BUILD_PATH = resolve(ROOT_PATH, 'build');


exports.commonExtract = {
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
exports.lessExtract = {
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

exports.baseConfig = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      BASE_PATH,
    ],
  },
  output: {
    publicPath: '/',
    path: BUILD_PATH,
  },
  module: {
    rules: [
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      chunks: ['vendor'],
      inject: false,
      minify: {
        removeAttributeQuotes: true,
        // removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: source => (
          source ?
            compile({ jsCode: [{ src: source }] }).compiledCode :
            ''
        ),
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: BASE_PATH,
    disableHostCheck: true,
    compress: true,
    port: 3001,
    host: '0.0.0.0',
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
