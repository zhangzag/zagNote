const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
   },
   node: {
      fs: "empty"
   },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join']
     }),
     new HtmlWebpackPlugin({
       title: 'webpack'
     }),
   ],
};
