const router = require('koa-router')()

const { getAdvRecom } = require('../../api/getRecom')
const passport = require('koa-passport');

router.get('/', async (ctx, next) => {
  // ctx.compress = true;
  passport.authenticate('local', function(err, user, info, status){
    ctx.login({id: 6565, username: '哈哈哈', password: '332211'})
  })(ctx)
   // passport.authenticate('local', function(err, user, info, status) {
  //   ctx.body = {user, err, info, status}
  //   return ctx.login({id: 1, username: 'admin', password: '123456'})
  // })(ctx)

  let bannerDatas = '';
  let cateList = ctx.state.cateList;

  await getAdvRecom({pageNo: 'indBanners'})
        .then(res=>{
          if( !res.data.success || res.data.data.length === 0 ){
            return false;
          }
          bannerDatas = res.data.data;
          // console.log('bannerDatas: ', bannerDatas)
        })
        .catch(err=>{
          //获取banner 报错
        })

  await ctx.render('index/index', {
    keywords: '啦啦啦',//页面关键字
    description: '哈哈哈',//页面描述
    title: '首页',//页面标题
    //传到模板的数据
    renderDada: { 
      bannerDatas,
      cateList,//分类列表数据
    },
  })
})

router.get('/string', async (ctx, next) => {
  // ctx.isAuthenticated()
  // ctx.isUnauthenticated()
  // await ctx.login()
  // ctx.logout()
  // ctx.state.user

  // 设置 session
  // ctx.session.username = "张"
  // ctx.body = 'koa2 string' + ctx.session.username
  
  // if (ctx.path === '/favicon.ico') return;
 
  // let n = ctx.session.views || 0;
  // ctx.session.views = ++n;
  // ctx.body = ctx.session;

  // if (ctx.isAuthenticated()) {
  //   // ctx.state.user就是鉴权后得到的用户身份
  //   ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
  // } else {
  //   ctx.throw(401)
  // }
  // passport.authenticate('local', function(err, user, info, status) {
  //   ctx.body = {user, err, info, status}
  //   return ctx.login({id: 1, username: 'admin', password: '123456'})
  // })(ctx)
  if( !ctx.isAuthenticated() ){
    ctx.redirect('/users')
  }else{
    ctx.body = '登录 -- ' + JSON.stringify( ctx.state );
  }
})

router.get('/json', async (ctx, next) => {
  // ctx.state.testing = 56897;
  ctx.logout()
  console.log('访问全局变量: ', ctx.state.testing)
  ctx.body = '退出 --- ' + JSON.stringify( ctx.state )
})

module.exports = router
