const router = require('koa-router')()

const { getAdvRecom, getProRecom, getProRecomDetail } = require('../../api/recommend/')
const { getPros } = require('../../api/product/')
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

  let cateList = ctx.state.cateList;
  let bannerDatas = '';
  let akRecomProducts = '';

  //轮播图
  await getAdvRecom({pageNo: 'indBanners'})
        .then(res=>{
          if( !res.data.success || res.data.data.length === 0 ){
            return false;
          }
          bannerDatas = res.data.data;
          // console.log('bannerDatas: ', bannerDatas)
        })
        .catch(err=>{
          console.log('获取banner 报错，', err)
        })

  //阿康推荐
  let akRecomDatas = '';
  await getProRecom({pageNo: 'pakRecom'})
        .then(res=>{
          if( !res.data.success || res.data.data.length === 0 ){
            return false;
          }
          akRecomDatas = res.data.data;
          // console.log('akRecomDatas: ', akRecomDatas)
        })
        .catch(err=>{
          console.log('获取阿康推荐出错', err)
        })
  
  let akRecomDetailArr = [];
  await getProRecomDetail({showID: akRecomDatas[0].showID})
        .then(res=>{
          // console.log('获取阿康推荐详细: ', res)
          if( res.data.data.length <=0 ){
            return
          }
          // akRecomDetailArr = res.data.data
          for(let val of res.data.data){
            akRecomDetailArr.push(val.productID)
          }
        })
        .catch(err=>{
          console.log('获取阿康推荐详细出错', err)
        })
        
  if( akRecomDetailArr.length>0 ){
  await getPros({productNumbers: akRecomDetailArr})
        .then(res=>{
          console.log('获取阿康推荐列表： ', res)
          if( res.data.success && res.data.data.length>0 ){
            akRecomProducts = res.data.data;
          }
        })
        .catch(err=>{
          console.log('获取阿康推荐产品列表出错，', err)
        })
  }

  await ctx.render('index/index', {
    keywords: '啦啦啦',//页面关键字
    description: '哈哈哈',//页面描述
    title: '首页',//页面标题
    //传到模板的数据
    renderDada: { 
      bannerDatas,//首页轮播
      cateList,//分类列表数据
      akRecomProducts, //阿康推荐产品
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
