const router = require('koa-router')()

// router.prefix('/order')

// //是否登录
// router.get('*', async (ctx, next)=>{
//   if( !ctx.state.memberInfo ){
//     ctx.redirect('/login.html');
//     return
//   }

//   await next();
// })

//提交订单
router.get('/submitOrder.html', async (ctx, next)=>{
    if( !ctx.state.memberInfo ){
      ctx.redirect('/login.html');
      return
    }

    await ctx.render('order/submitOrder', {
      keywords: '阿康大药房-提交订单',//页面关键字
      description: '',//页面描述
      title: '阿康大药房-提交订单',//页面标题
      //传到模板的数据
      renderData: { 
        memberInfo: ctx.state.memberInfo || '',//会员信息
        cateList: ctx.state.cateList || '',//分类列表数据
      },
    })
});

//提交订单 - 成功页
router.get('/submitSuccess.html', async (ctx, next)=>{
    if( !ctx.state.memberInfo ){
      ctx.redirect('/login.html');
      return
    }
    
    await ctx.render('order/submitSuccess', {
      keywords: '阿康大药房-提交成功',//页面关键字
      description: '',//页面描述
      title: '阿康大药房-提交成功',//页面标题
      //传到模板的数据
      renderData: { 
        memberInfo: ctx.state.memberInfo || '',//会员信息
        cateList: ctx.state.cateList || '',//分类列表数据
      },
    })
});

module.exports = router
