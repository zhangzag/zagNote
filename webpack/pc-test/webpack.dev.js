const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
      port: 3002,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      inline: true,
      historyApiFallback: true,
      https: false,
      proxy: {
        // "**": "http://localhost:9090"
      },
  }
});
