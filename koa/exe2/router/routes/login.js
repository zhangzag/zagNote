const router = require('koa-router')()

const { getAdvRecom, getProRecom, getProRecomDetail } = require('../../api/recommend/')
const { loginMember } = require('../../api/login/')

const { setCookieByKey, getCookieByKey, removeCookie } = require('../../util/')
const { curWebRoot } = require('../../api/apiConfig')

//登录页
router.get('/login.html', async (ctx, next)=>{
  await ctx.render('login/index', {
    keywords: '阿康大药房登录页面',//页面关键字
    description: '阿康大药房，登录，忘记密码，注册',//页面描述
    title: '阿康大药房-登录',//页面标题
    //传到模板的数据
    renderData: { 
      headTitle: '会员登录',
      curPage: 1,//当前页，1-登录页，2-注册页，3-找回密码
      // akRecomProducts, //阿康推荐产品
    },
  })
});

//注册页
router.get('/register.html', async (ctx, next)=>{
  await ctx.render('login/register', {
    keywords: '阿康大药房会员注册',//页面关键字
    description: '阿康大药房，登录，忘记密码，注册',//页面描述
    title: '阿康大药房-会员注册',//页面标题
    //传到模板的数据
    renderData: { 
      headTitle: '会员注册',
      curPage: 2,//当前页，1-登录页，2-注册页，3-找回密码
      curWebRoot, //baseUrl
    },
  })
});

//找回密码页
router.get('/forgetPassword.html', async (ctx, next)=>{
  await ctx.render('login/forgetPassword', {
    keywords: '阿康大药房找回秘密',//页面关键字
    description: '阿康大药房，登录，忘记密码，注册，找回密码',//页面描述
    title: '阿康大药房-找回密码',//页面标题
    //传到模板的数据
    renderData: { 
      headTitle: '找回密码',
      curPage: 3,//当前页，1-登录页，2-注册页，3-找回密码
      curWebRoot, //baseUrl
    },
  })
});

//接口 - 登录
router.post(['/toLogin', '/login'], async (ctx, next)=>{
  let account = ctx.request.body;

  if(!account){
    ctx.body = {
      success: false,
      msg: '缺少账号或密码'
    }
    return
  }

  let username = account.username, password = account.password;
  if( !username ){
    // ctx.throw(500, '出错了，缺少账号参数');
    ctx.body = {
      success: false,
      msg: '缺少账号参数'
    }
    return
  }
  if( !password ){
    // ctx.throw(500, '出错了，缺少密码参数');
    ctx.body = {
      success: false,
      msg: '缺少密码参数'
    }
    return
  }

  await loginMember({
    username,
    password
  })
  .then(res=>{
    // console.log('登录：', res)
    ctx.body = res.data;  
    if( res.data.success ){
      //登录成功 存储信息
      
      //设置cookie
      setCookieByKey( ctx, res.data.memberID )
      //获取cookie
      // console.log(224455, getCookieByKey( ctx, '_sami' ))
    }  
  })
  .catch(err=>{
    console.log('登录出错了, ', err.response.status, err.response.data)
    ctx.throw(err.response.status, err.response.data);
  })
})
//接口 - 退出登录
router.get('/loginOut', async (ctx, next)=>{
  if(removeCookie(ctx, '_sami')){
    //移除cookie
    ctx.body = {
      success: true,
      msg: '已安全退出',
    }
  }else{
    ctx.body = {
      success: false,
      msg: '安全退出出错了'
    }
  };
})

module.exports = router
