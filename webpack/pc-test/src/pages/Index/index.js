// require('pages/Common/index.js');
require('./style/index.css');
var Hogan = require('hogan.js');
var indexHtml = require('./index.string');
// var indexHtml2 = require('./index.art');
// console.log('indexHtml2',  indexHtml2({
//     title: 'My Page'
// }) )
// var Icon = require('image/test.png');
// var Icon = require('~/assets/images/test2.jpg');
var Icon = require('../../assets/images/test2.jpg');

var element = document.createElement('h1');
var myIcon = new Image();
//
myIcon.src = Icon;
document.body.appendChild(element)
element.appendChild(myIcon)

console.log(232323232, myIcon)
console.log(951)

// var people = ['geddy', 'neil', 'alex'];
// var html = Hogan.compile(indexHtml);
// var output = html.render({people2: people});
//
// console.log('html: ', html)
// console.log('output: ', output)

// {{data}} 转义的变量
// {{{data}}} 不转义的变量
// {{#list}} {{/list}} 列表循环 / 真值判断
// {{^list}} {{/list}} 空列表 / 非真值判断
// {{.}} 枚举的当前元素
// {{!}} 我是注释
//
//
// function getHtmlMoudle( ...modules ){
//   console.log(123456789)
//   console.log('modules: ', modules.forEach( key => {
//     console.log(key)
//   } ))
//   // new HtmlWebpackPlugin({
//   //   title       : '首页啦啦啦',
//   //   template: './src/view/index.html',
//   //   filename: 'index.html',
//   //   inject      : true,
//   //   hash        : true,
//   //   chunks      : ['index', 'common']
//   // }),
// };
//
// getHtmlMoudle(
//   {
//     title       : '首页啦啦啦',
//     template: './src/view/index.html',
//     filename: 'index.html',
//     inject      : true,
//     hash        : true,
//     chunks      : ['index', 'common']
//   },
//     {
//       title       : '首页啦',
//       template: './src/view/index.html',
//       filename: 'index.html',
//       inject      : true,
//       hash        : true,
//       chunks      : ['index', 'common']
//     },
// );
//
// // var mods = require('../../../modules.js');
// // console.log('mods: ', mods)
