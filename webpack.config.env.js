const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const ClosureCompilerPlugin = require('google-closure-compiler-js');

const ROOT_PATH = resolve(__dirname);
const BASE_PATH = resolve(ROOT_PATH, 'src');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

module.exports = Object.assign(baseConfig, {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      BASE_PATH,
    ],
  },
  output: Object.assign(baseConfig.output, {
    publicPath: '/',
    path: BUILD_PATH,
  }),
  plugins: baseConfig.plugins.concat([
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
            ClosureCompilerPlugin.compile({ jsCode: [{ src: source }] }).compiledCode :
            ''
        ),
      },
    }),
  ]),
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
});
