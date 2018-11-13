const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');
var webpack = require("webpack");
require('es5-shim')
require('es5-shim/es5-sham')
require('console-polyfill')
require('fetch-ie8')
require('babel-polyfill')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
   plugins: [
     new es3ifyPlugin(),
     new HtmlWebpackPlugin({
       title: 'Output Management',
       template: './src/index.html'
     })
   ],
   optimization: {
    minimize: false
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
 module: {
   rules: [
     // {
     //   test: /\.css$/,
     //   use: [
     //     'style-loader',
     //     'css-loader'
     //   ]
     // }
        // {
        //   test: /\.js$/,
        //   loader: 'es3ify-loader'
        // },
       {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // {
      //   postLoaders: [
      //     { test: /\.js$/, loader: 'es3ify' }
      //   ]
      // },
   ]
 },
};
