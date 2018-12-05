const path = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const processEnv = process.env;
console.log( `web is start in ${processEnv.NODE_ENV} !!!!` );

let options = {
  entry: {},
  output: {
    filename: '[name].js',
    // publicPath: path.resolve(__dirname, './'),
    // publicPath: '/',
    publicPath: processEnv.NODE_ENV==='development' || processEnv.NODE_ENV==='preview'?'/':'/pc_test/',
    path: path.resolve(__dirname, 'dist')
  },
  externals : {
     jquery: "jQuery"
  },
  node: {
     fs: "empty"
  },
  module: {
      loaders: [
            { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' },
            { 
              test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!sass-resources-loader") 
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)$/, loader: 'url-loader?limit=8192&name=resource/[name].[ext]' },
            { test: /\.hbs$/, loader: 'html-loader', query : {minimize : true,removeAttributeQuotes : false }
            },
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { 'presets': ['env'], } }
      ]
  },
  sassResources: './src/assets/style/base.scss',
  // Or array of paths
  // sassResources: [ './path/to/vars.scss', './path/to/mixins.scss' ],
  plugins: [
    // new CleanWebpackPlugin(['./dist/*']),
    // 提供公共代码, 默认会把所有入口节点的公共代码提取出来,生成一个common.js
    // new webpack.optimize.CommonsChunkPlugin({
    //     name : 'common',
    //     filename : 'js/common.js',
    // }),
    // new ExtractTextPlugin("css/[name].css"),
    new ExtractTextPlugin("static/css/[name].css"),
    new CopyWebpackPlugin([ // 复制
      { from: path.join(__dirname,'/static/'), to: path.join(__dirname,'/dist/static/') },
      // { flatten: true, from: './statics/*', to: path.join(__dirname,'/dist/static/') }
    ]),
    //定义全局变量
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: processEnv.NODE_ENV?JSON.stringify(processEnv.NODE_ENV) : 'development'
      }
    })
  ],
  resolve : {
      extensions: ['', '.es6','.js', '.json', '.css', '.less', '.hbs', '.scss'],
      alias : {
          // node_modules    : __dirname + '/node_modules',
          // util            : __dirname + '/src/util',
          // page            : __dirname + '/src/page',
          // service         : __dirname + '/src/service',
          'image' : __dirname + '/src/assets/images',
          '~': __dirname + '/src',
          '@': __dirname + '/src',
          'rooturl': __dirname + '/',
          'pages': __dirname + '/src/pages',
          'views': __dirname + '/src/view',
          'apis': __dirname + '/src/api'
      }
  },
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
