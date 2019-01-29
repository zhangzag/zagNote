const router = require('koa-router')()

const passport = require('koa-passport');
const {_req} = require('../../api/apiConfig.js');
const axiosAll = _req.axiosAll;
const { getAdvRecom, getProRecom, getProRecomDetail } = require('../../api/recommend/')
const { getPros, getALLDisease } = require('../../api/product/')
const { loginMember } = require('../../api/login/')
const { getMemberInfo } = require('../../api/member/')

const { setCookieByKey, getCookieByKey, removeCookie } = require('../../util/')

//首页
router.get(['/', '/index.html'], async (ctx, next) => {
  ctx.compress = true;
  passport.authenticate('local', function(err, user, info, status){
    ctx.login({id: 6565, username: '哈哈哈', password: '332211'})
  })(ctx)
   // passport.authenticate('local', function(err, user, info, status) {
  //   ctx.body = {user, err, info, status}
  //   return ctx.login({id: 1, username: 'admin', password: '123456'})
  // })(ctx)

  let bannerDatas = '';
  let akRecomProducts = '';

  let akRecomDatas = '';
  // await axiosAll([getAdvRecom({pageNo: 'indBanner'}),getProRecom({pageNo: 'pakRecom'})])
  await axiosAll([getAdvRecom({pageNo: 'indBanners'}),getProRecom({pageNo: 'pakRecom'})])
  .then(res=>{
    // console.log('全部res - 0： ', res[0].data.data)
    bannerDatas = res[0].data.data;

    // console.log('全部res - 1： ', res[1].data)
    akRecomDatas = res[1].data.data;
    // console.log('akRecomProducts1-1: ')
  })
  .catch(err=>{
    console.log('获取轮播图或获取阿康推荐出错了， ', err)
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
      // console.log('获取阿康推荐列表： ', res)
      if( res.data.success && res.data.data.length>0 ){
        akRecomProducts = res.data.data;
      }
    })
    .catch(err=>{
      console.log('获取阿康推荐产品列表出错，', err)
    })
  }
  
  await ctx.render('index/index', {
    keywords: '药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '网上买药找药去哪个网站？药房网、网上药店、处方药网购哪个好？买药品最正规的网站【阿康大药房】经国家药监局批准的专业药房网,可选同仁堂等品牌产品的网上药店!-阿康大药房',//页面描述
    title: '阿康大药房',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      bannerDatas,//首页轮播
      cateList: ctx.state.cateList || '',//分类列表数据
      akRecomProducts, //阿康推荐产品
    },
  })
})

//找药
router.get('/findDrug.html', async (ctx, next)=>{
  let drugList = '';

  await getALLDisease({
    page: 1,
    limit: 100,
  })
  .then(res=>{
    console.log('找药列表： ', res)
    if( res.data ){
      drugList = res.data;
    }
  })
  .catch(err=>{
    console.log('获取找药列表出错')
  })

  
  await ctx.render('index/findDrug', {
    keywords: '',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-找药,病重分类',//页面标题
    //传到模板的数据
    renderDada: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      drugList,
    },
  })
});

//帮助页
router.get('/help-new.html', async (ctx, next)=>{
  await ctx.render('help/help-new.html', {
    keywords: '',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-帮助中心',//页面标题
    //传到模板的数据
    renderDada: { 
      cateList: ctx.state.cateList || '',//分类列表数据
    },
  })
});

// router.get('/string', async (ctx, next) => {
//   if( !ctx.isAuthenticated() ){
//     ctx.redirect('/users')
//   }else{
//     ctx.body = '登录 -- ' + JSON.stringify( ctx.state );
//   }
// })

// router.get('/json', async (ctx, next) => {
//   ctx.logout()
//   ctx.body = '退出 --- ' + JSON.stringify( ctx.state )
// })

module.exports = router
