const router = require('koa-router')()

const { getAdvRecom, getProRecom, getProRecomDetail } = require('../../api/recommend/')
const { loginMember } = require('../../api/login/')

const { setCookieByKey, getCookieByKey, removeCookie } = require('../../util/')

//登录页
router.get('/login.html', async (ctx, next)=>{
  await ctx.render('login/index', {
    keywords: '阿康大药房登录页面',//页面关键字
    description: '阿康大药房，登录，忘记密码，注册',//页面描述
    title: '阿康大药房-登录',//页面标题
    //传到模板的数据
    renderDada: { 
      // bannerDatas,//首页轮播
      // cateList: ctx.state.cateList || '',//分类列表数据
      // akRecomProducts, //阿康推荐产品
    },
  })
});
//接口 - 登录
router.post('/toLogin', async (ctx, next)=>{
  let account = ctx.request.body;

  if(!account){
    ctx.throw(500, '出错了，缺少账号参数');
  }

  let username = account.username, password = account.password;
  if( !username ){
    ctx.throw(500, '出错了，缺少账号参数');
  }
  if( !password ){
    ctx.throw(500, '出错了，缺少密码参数');
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
    console.log('登录出错了, ', err)
    ctx.throw(err.status, err);
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
