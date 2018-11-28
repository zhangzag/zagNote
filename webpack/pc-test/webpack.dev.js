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
        // http://113.108.163.210:9999/AKGW-api/v1/product/getProductByProductNumber
        '/tapi': {
          target: 'http://113.108.163.210:9999',
          pathRewrite: {
            "^/tapi":"/AKGW-api/v1"
          },
          changeOrigin: true,
          secure: false
        }
      },
  }
});
