const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['./dist/*']),
    // 提供公共代码, 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    new webpack.optimize.CommonsChunkPlugin({
        name : 'common',
        filename : 'js/common.js',
    }),
    new UglifyJsPlugin({
      ie8: true,//支持IE8。
      exclude:['/node_modules/'],
      sourceMap: false,
      compress:{
          properties: false,//用.来重写属性引用，例如foo["bar"] → foo.bar
          warnings: false
      },
      output:{
            comments:false,
            beautify: false,
            quote_keys: true,//传true的话会在对象所有的键加上括号, 解决ie下 default、class等的保留字问题
      },
      mangle: {
          screw_ie8: false,//默认为true,会去掉支持ie8的api
      },
    }),
    // new CopyWebpackPlugin([ // 复制
    //   { from: path.join(__dirname,'/static/'), to: path.join(__dirname,'/dist/static/') },
    //   // { flatten: true, from: './statics/*', to: path.join(__dirname,'/dist/static/') }
    // ])
  ]
});
