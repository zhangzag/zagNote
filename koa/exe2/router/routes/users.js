const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response! -- 未登录跳转到这里 --- ' + JSON.stringify( ctx.state ) 
})

router.get('/bar', function (ctx, next) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);

  ctx.body = 'this is a users/bar response -- ' + n
})

module.exports = router
