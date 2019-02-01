const router = require('koa-router')()

router.prefix('/member')

//是否登录
router.get('*', async (ctx, next)=>{
  console.log(11111, ctx.state.memberInfo)
  if( !ctx.state.memberInfo ){
    ctx.redirect('/login.html');
    return
  }

  await next();
})

//会员首页 - 个人资料
router.get(['/', '/index.html'], async (ctx, next)=>{
  await ctx.render('member/index', {
    keywords: '啦啦啦',//页面关键字
    description: '哈哈哈',//页面描述
    title: '个人中心',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 1,//当前所在位置 对应左边导航条的行位置 1 - 个人资料
    },
  })
})

//我的订单
router.get('/order.html', async (ctx, next)=>{
  await ctx.render('member/order', {
    keywords: '阿康大药房-我的订单中心',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-我的订单中心',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 2,//当前所在位置 对应左边导航条的行位置
    },
  })
});
//订单详情
router.get('/order_detail.html', async (ctx, next)=>{
  await ctx.render('member/order_detail', {
    keywords: '阿康大药房-订单详情',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-订单详情',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 2,//当前所在位置 对应左边导航条的行位置
    },
  })
});

//我的收藏
router.get('/collection.html', async (ctx, next)=>{
  await ctx.render('member/collection', {
    keywords: '阿康大药房-我的收藏',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-我的收藏',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 3,//当前所在位置 对应左边导航条的行位置
    },
  })
});

//收货地址
router.get('/address.html', async (ctx, next)=>{
  await ctx.render('member/address', {
    keywords: '阿康大药房-我的收货地址',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-我的收货地址',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 4,//当前所在位置 对应左边导航条的行位置
    },
  })
});

//处方笺
router.get('/prescript.html', async (ctx, next)=>{
  await ctx.render('member/prescript', {
    keywords: '阿康大药房-我的处方笺',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-我的处方笺',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 5,//当前所在位置 对应左边导航条的行位置
    },
  })
});
//处方笺列表
router.get('/prescript_list.html', async (ctx, next)=>{
  await ctx.render('member/prescript_list', {
    keywords: '阿康大药房-处方笺列表',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-处方笺列表',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 5,//当前所在位置 对应左边导航条的行位置
    },
  })
});
//处方笺详情
router.get('/prescript_detail.html', async (ctx, next)=>{
  await ctx.render('member/prescript_detail', {
    keywords: '阿康大药房-处方笺详情',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-处方笺详情',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 5,//当前所在位置 对应左边导航条的行位置
    },
  })
});

//需求登记
router.get('/demandRecord.html', async (ctx, next)=>{
  await ctx.render('member/demandRecord', {
    keywords: '阿康大药房-我的需求登记',//页面关键字
    description: '哈哈哈',//页面描述
    title: '阿康大药房-我的需求登记',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
      curList: 6,//当前所在位置 对应左边导航条的行位置
    },
  })
});

router.get('/bar', function (ctx, next) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);

  ctx.body = 'this is a users/bar response -- ' + n
})

module.exports = router
