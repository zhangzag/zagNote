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
      // contentBase: path.join(__dirname, 'dist'),
      contentBase: path.join(__dirname, '/'),
      compress: true,
      hot: true,
      inline: true,
      historyApiFallback: true,
      https: false,
      proxy: {
        // http://192.168.2.254:8080/AKGW-api/v1/searchShowBrand
        // http://113.108.163.210:9999/AKGW-api/v1
        '/tapi': {
          target: 'http://113.108.163.210:9999',
          // target: 'http://192.168.2.254:8080',
          pathRewrite: {
            "^/tapi":"/AKGW-api/v1"
          },
          changeOrigin: true,
          secure: false
        }
      },
  }
});
