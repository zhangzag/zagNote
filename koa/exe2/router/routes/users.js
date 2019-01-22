const router = require('koa-router')()
const { setCookieByKey, getCookieByKey, removeCookie } = require('../../util/')
const { getMemberInfo } = require('../../api/member/')

router.prefix('/member')

router.get(['/', '/index.html'], async (ctx, next)=>{
  // ctx.body = 'this is a users response! -- 未登录跳转到这里 --- ' + JSON.stringify( ctx.state ) 
  if( !getCookieByKey(ctx, '_sami') ){
    ctx.redirect('/login.html');
  }
  
  const sha256 = require('sha-256-js');
  let memberInfo = '';//会员信息

  //获取用户信息
  if( getCookieByKey(ctx, '_sami') ){
    getMemberInfo({
      id: getCookieByKey(ctx, '_sami'),
      headers: {Authorization: sha256(getCookieByKey(ctx, '_sami') + 'akjk')}
    })
    .then(res=>{
      // console.log('获取会员信息： ', res.data)
      if(!res.data){ console.log('没有会员信息，', res);return; }

      memberInfo = res.data;
    })
    .catch(err=>{
      console.log('获取会员信息出错了： ', err)
    })
  }
  
  await ctx.render('member/index', {
    keywords: '啦啦啦',//页面关键字
    description: '哈哈哈',//页面描述
    title: '个人中心',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo,//会员信息
      cateList: ctx.state.cateList || '',//分类列表数据
    },
  })
})

router.get('/bar', function (ctx, next) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);

  ctx.body = 'this is a users/bar response -- ' + n
})

module.exports = router
