// require("babel-polyfill");

module.exports = {
  //入口文件
  entrys: {
    'common'  : './src/pages/Common/index.js',
    'index'   : './src/pages/Index/index.js',
    'login'   : './src/pages/Login/index.js',
    'comHead' : './src/components/head.js'
  },
  //页面模板
  modules: [
    {
      title       : '首页啦啦啦',
      template: './src/view/index.html',
      filename: 'index.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'index' ]
    },
    {
      title       : '我们的登录页面',
      template: './src/view/login.html',
      filename: 'login.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'login']
    },
    {
      title       : '公共头部',
      template: './src/components/head.html',
      filename: '/components/head.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'comHead']
    }
  ]
}
