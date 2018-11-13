const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
      port: 8088,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      historyApiFallback: true,
      https: false,
  }
});
