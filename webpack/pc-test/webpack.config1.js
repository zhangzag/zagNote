const path = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var options = {
  entry: {
    // 'common' : './src/pages/Common/index.js',
    // 'index': './src/pages/Index/index.js',
    // 'login': './src/pages/Login/index.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist')
  },
  externals : {
     jquery: "jQuery"
  },
  // node: {
  //    fs: "empty"
  // },
  module: {
      loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          // { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=resource/[name].[ext]' },
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)$/, loader: 'url-loader?limit=5000&name=resource/[name].[ext]' },
          { test: /\.ejs$/, loader: 'ejs-loader' },
          { test: /\.(string|html)$/, loader: 'html-loader', query : {minimize : true,removeAttributeQuotes : false }
          },
          // { test: /\.art$/, loader: 'art-template-loader', query : {} },
          // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { 'presets': ['env'], } }
          { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' }
      ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/*']),
    // 提供公共代码, 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    // new webpack.optimize.CommonsChunkPlugin({
    //     name : 'common',
    //     filename : 'js/common.js',
    // }),
    new ExtractTextPlugin("css/[name].css"),
    // new HtmlWebpackPlugin({
    //   title       : '首页啦啦啦',
    //   template: './src/view/index.html',
    //   filename: 'index.html',
    //   inject      : true,
    //   hash        : true,
    //   chunks      : ['common', 'index']
    // }),
    // new HtmlWebpackPlugin({
    //   title       : '我们的登录页面',
    //   template: './src/view/login.html',
    //   filename: 'login.html',
    //   inject      : true,
    //   hash        : true,
    //   chunks      : ['common', 'login']
    // }),
    // new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin({
      beautify:true,
      exclude:['/node_modules/'],
      // mangle: ,
      compress:{
          warnings:false
      },
      output:{
          comments:false
      }
    }),
  ],
  resolve : {
      extensions: ['', '.es6','.js', '.jsx', '.json', '.css', '.less', '.string'],
      alias : {
          // node_modules    : __dirname + '/node_modules',
          // util            : __dirname + '/src/util',
          // page            : __dirname + '/src/page',
          // service         : __dirname + '/src/service',
          'image' : __dirname + '/src/assets/images',
          '~': __dirname + '/src',
          'pages': __dirname + '/src/pages',
          'views': __dirname + '/src/view'
      }
  },
  devtool: 'inline-source-map',
  devServer: {
      // port: 8088,
      // inline: true,
      // hot: true,
      // // contentBase: './dist',
      // proxy : {
      //     '**/*.do' : {
      //         target: 'http://test.happymmall.com',
      //         changeOrigin : true
      //     }
      // }
      port: 8088,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      historyApiFallback: true,
      https: false,
  }
};

let mods = require('./templates.js');
options.entry = mods.entrys;
// mods.modules.forEach( key => {
//   options.plugins.push( new HtmlWebpackPlugin(key) );
// } );
mods.modules.forEach( function(key){
  options.plugins.push( new HtmlWebpackPlugin(key) );
} );

options.plugins.push( new webpack.optimize.CommonsChunkPlugin({
    name : 'common',
    filename : 'js/common.js',
}) );

module.exports = options;
