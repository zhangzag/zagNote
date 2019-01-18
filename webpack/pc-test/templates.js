require("babel-polyfill");

module.exports = {
  //入口文件
  entrys: {
    'common'          : ['babel-polyfill', './src/pages/Common/index.js'],
    'index'           : ['babel-polyfill', './src/pages/Index/index.js'],
    'login'           : ['babel-polyfill', './src/pages/Login/index.js'],
    'forgetPassword'  : ['babel-polyfill', './src/pages/Login/forgetPassword.js'],
    'register'        : ['babel-polyfill', './src/pages/Login/register.js'],
    'memberIndex'     : ['babel-polyfill', './src/pages/Member/index.js'],
    'updateInfo'      : ['babel-polyfill', './src/pages/Member/updateInfo.js'],
    'order'           : ['babel-polyfill', './src/pages/Member/order.js'],
  },
  //页面模板
  modules: [
    {
      title       : '阿康大药房',
      template    : './src/view/index.html',
      filename    : 'index.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'index' ]
    },
    {
      title       : '用户登录',
      template    : './src/view/login.html',
      filename    : 'login.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'login']
    },
    {
      title       : '找回密码',
      template    : './src/view/forgetPassword.html',
      filename    : 'forgetPassword.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'forgetPassword']
    },
    {
      title       : '新用户注册',
      template    : './src/view/register.html',
      filename    : 'register.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'register']
    },
    {
      title       : '阿康大药房会员中心-个人资料',
      template    : './src/view/member/index.html',
      filename    : 'member/index.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'memberIndex']
    },
    {
      title       : '阿康大药房会员中心-个人资料修改',
      template    : './src/view/member/updateinfo.html',
      filename    : 'member/updateInfo.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'updateInfo']
    },
    {
      title       : '阿康大药房会员中心-我的订单',
      template    : './src/view/member/order.html',
      filename    : 'member/order.html',
      inject      : true,
      hash        : true,
      chunks      : ['common', 'order']
    }
  ]
}
