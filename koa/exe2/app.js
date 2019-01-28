const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const favicon = require('koa-favicon');
const render = require('koa-art-template');
const path = require('path')
const sha256 = require('sha-256-js');
// var htmlMinifier = require('html-minifier').minify;
const htmlMinifier = require('html-minifier').minify;
const utils = require('./util/');//工具

const { getMemberInfo } = require('./api/member/')
const axiosAll = require('./api/apiConfig.js')._req.axiosAll;

const { getCookieByKey } = require('./util/')

render(app, {
  root: path.join(__dirname, 'views'),
  // extname: '.art',
  extname: '.html',
  // debug: process.env.NODE_ENV !== 'production',
  debug: false,
  // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出
  // 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
  minimize: true,
  // 是否编译调试版
  // compileDebug: true,
  htmlMinifier: htmlMinifier,// HTML 压缩器。仅在 NodeJS 环境下有效
  // HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
  htmlMinifierOptions: {
    removeAttributeQuotes: true,
    removeComments: true,//是否去掉注释
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // 运行时自动合并：rules.map(rule => rule.test)
    ignoreCustomFragments: []
  },
  imports: {
    ...utils.moduleFuns,//模板工具类
  }
});
// const index = require('./routes/index')
// const index = require(routers.index);
// const users = require('./routes/users')
// const users = require(routers.users)

// error handler
onerror(app)

app.use( 
  compress({
    filter: function(content_type) { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
      return /text/i.test(content_type);
    },
    threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
    flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
  })
)

//favicon
app.use(favicon(__dirname + '/favicon.ico'));
console.log('现在时间： ' ,new Date().getTime())
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/assets', {
  hidden: true,
  gzip: true,
}))

// app.use(views(__dirname + '/views', {
//   // extension: 'ejs',
//   // map: { html: 'ejs' }
//   // map: { html: 'art' }
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//测试

// Sessions
const session = require('koa-session')
app.use(session({
  key: 'zayjt',// default is koa:sess
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
}, app))
app.keys = ['zayjt key']
const conf = {
  encode: json => JSON.stringify(json),
  decode: str => JSON.parse(str)
}
app.use(session(conf, app))

// const passport = require('koa-passport')
// const passport = require('./passport')
// app.use(passport.initialize())
// app.use(passport.session())

// 定义一个验证用户的策略，需要定义name作为标识
// const naiveStrategy = {
//   name: 'naive',
//   // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
//   authenticate: function (req) {
//     let uid = req.query.uid
//     if (uid) {
//       // 策略很简单，就是从参数里获取uid，然后组装成一个user
//       let user = {id: parseInt(uid), name: 'user' + uid}
//       this.success(user)
//     } else {
//       // 如果找不到uid参数，认为鉴权失败
//       this.fail(401)
//     }
//   }
// }

// // 调用use()来为passport新增一个可用的策略
// const passport = require('koa-passport')
// passport.use(naiveStrategy)
// // 添加一个koa的中间件，使用naive策略来鉴权。这里暂不使用session
// // app.use(passport.authenticate('naive', {session: false}))
// app.use(passport.initialize())
// app.use(passport.session())
const passport = require('./passport');
// app.use(passport.authenticate('naive', {session: false}))
app.use(passport.initialize())
app.use(passport.session())

//测试 end

// 设置全局数据
const { getCategory } = require('./api/header/');//分类列表 
app.use(async (ctx, next) => {
  let apiArr = [];
  apiArr.push( getCategory() );//分类

  //获取会员信息
  if(getCookieByKey(ctx, '_sami')){
    apiArr.push( getMemberInfo({ id: getCookieByKey(ctx, '_sami'), headers: {Authorization: sha256(getCookieByKey(ctx, '_sami') + 'akjk')} }) );
  }
  
  await axiosAll(apiArr)
  .then(res=>{
    // console.log('两个数据： ', res[1].data)
    //分类列表
    if( res[0].data.data ){
      let cateList = [];
      
      cateList = res[0].data.data.filter((item, index)=>{
        return index < 14;
      })
      ctx.state = Object.assign(ctx.state, { cateList });
    }
    //会员信息
    if( res[1] && res[1].data ){
      ctx.state = Object.assign(ctx.state, { memberInfo: res[1].data });
    }
  })
  .catch(err=>{
    console.log('获取分类或取会员信息出错了： ', err)
  })
  // await getCategory()
  // .then(res=>{
  //   // console.log('分类列表: ', res.data)
  //   if( res.data.data ){
  //     let cateList = [];
      
  //     cateList = res.data.data.filter((item, index)=>{
  //       return index < 14;
  //     })
  //     ctx.state = Object.assign(ctx.state, { cateList });
  //   }
  // })
  // .catch(err=>{
  //   console.log('分类列表出错了，', err)
  // })
  
  await next();
})

// app.use(async (ctx, next) => {
//   //获取用户信息
//   if( getCookieByKey(ctx, '_sami') ){
//     await getMemberInfo({
//       id: getCookieByKey(ctx, '_sami'),
//       headers: {Authorization: sha256(getCookieByKey(ctx, '_sami') + 'akjk')}
//     })
//     .then(res=>{
//       // console.log('获取会员信息： ', res.data)
//       if(!res.data){ console.log('没有会员信息，', res);return; }
  
//       // memberInfo = res.data;
//       ctx.state = Object.assign(ctx.state, { memberInfo: res.data });
//     })
//     .catch(err=>{
//       console.log('获取会员信息出错了： ', err)
//     })
//   }
//   await next();
// })

const routers = require('./router/')

//处理错误页面
app.use(async (ctx, next)=>{
  await next()
  if( ctx.status == 404 ){
    ctx.redirect('/404')
  }else if(ctx.status == 500){
    ctx.redirect('/err')
  }
})

//路由
Object.keys(routers).forEach(key=>{
  let r = require(routers[key])
  
  app.use(r.routes(), r.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
