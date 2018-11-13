const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // 提供公共代码, 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : 'js/common.js',
    }),
    new UglifyJsPlugin({
      exclude:['/node_modules/'],
      compress:{
          warnings:false
      },
      output:{
          comments:false
      }
    }),
  ]
});
