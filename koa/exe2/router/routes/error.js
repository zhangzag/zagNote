const router = require('koa-router')()

// router.get('/*', async (ctx, next)=>{
//     await next();
//     ctx.body = '这是404页面'
// });

router.get('/404', (ctx, next)=>{
    ctx.body = '这是404页面'
});

router.get('/err', (ctx, next)=>{
    ctx.body = '这是500页面'
});

module.exports = router