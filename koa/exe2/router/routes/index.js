const router = require('koa-router')()

// const passport = require('koa-passport');
const {_req} = require('../../api/apiConfig.js');
const axiosAll = _req.axiosAll;
const { getAdvRecom, getProRecom, getProRecomDetail, getRecomBrand, getBrandRecomDetail } = require('../../api/recommend/')
const { getPros, getALLDisease } = require('../../api/product/')
const { loginMember } = require('../../api/login/')
const { getMemberInfo } = require('../../api/member/')

const { setCookieByKey, getCookieByKey, removeCookie } = require('../../util/')

//首页
router.get(['/', '/index.html'], async (ctx, next) => {
  ctx.compress = true;
  // passport.authenticate('local', function(err, user, info, status){
  //   ctx.login({id: 6565, username: '哈哈哈', password: '332211'})
  // })(ctx)

  let bannerDatas = '', akRecomProducts = '', akRecomDatas = '', floorName = '', floorBotAdv = '', floorRecomDatas = '', floorProducts1 = '', floorProducts2 = '', floorProducts3 = '', floorProducts4 = '', floorProducts5 = '', floorProducts6 = '', advImgLDatas = '', advImgSDatas = '', floorBrandDatas = '';
  await axiosAll([
    getAdvRecom({pageNo: 'indBanners'}),
    getProRecom({pageNo: 'pakRecom'}),
    getAdvRecom({pageNo: 'fName'}),
    getAdvRecom({pageNo: 'pFloorAdv'}),
    getProRecom({pageNo: 'pcRecom'}),
    getAdvRecom({pageNo: 'fAdvImgL'}),
    getAdvRecom({pageNo: 'fAdvImgS'}),
    getRecomBrand({pageNo: 'akBrands'}),//楼层品牌推荐
  ])
  .then(res=>{
    // 轮播图
    bannerDatas = res[0].data.data;
    // 阿康推荐
    akRecomDatas = res[1].data.data;
    // 楼层名称
    floorName = res[2].data.data;
    // 楼层底部广告
    floorBotAdv = res[3].data.data;
    // 楼层商品推荐
    floorRecomDatas = res[4].data.data;
    // 楼层大图广告
    advImgLDatas = res[5].data.data;
    // 楼层小图广告
    advImgSDatas = res[6].data.data;
    //楼层品牌推荐
    floorBrandDatas = res[7].data.data;
  })
  .catch(err=>{
    console.log('获取轮播图或获取阿康推荐出错了， ', err)
  })
  
  let akRecomDetailArr = [], floorRecomDetailArr1 = [], floorRecomDetailArr2 = [], floorRecomDetailArr3 = [], floorRecomDetailArr4 = [], floorRecomDetailArr5 = [], floorRecomDetailArr6 = [], brandsDetailArr = [], brandRecomDetailArr1 = [], brandRecomDetailArr2 = [], brandRecomDetailArr3 = [], brandRecomDetailArr4 = [], brandRecomDetailArr5 = [], brandRecomDetailArr6 = [];
  await axiosAll([
    getProRecomDetail({showID: akRecomDatas[0].showID}),
    getProRecomDetail({showID: floorRecomDatas[0].showID}),//1楼
    getProRecomDetail({showID: floorRecomDatas[1].showID}),//2楼
    getProRecomDetail({showID: floorRecomDatas[2].showID}),//3楼
    getProRecomDetail({showID: floorRecomDatas[3].showID}),//4楼
    getProRecomDetail({showID: floorRecomDatas[4].showID}),//5楼
    getProRecomDetail({showID: floorRecomDatas[5].showID}),//6楼
    getBrandRecomDetail({showBrandID: floorBrandDatas[0].showBrandID}),//1楼品牌推荐
    getBrandRecomDetail({showBrandID: floorBrandDatas[1].showBrandID}),//2楼品牌推荐
    getBrandRecomDetail({showBrandID: floorBrandDatas[2].showBrandID}),//3楼品牌推荐
    getBrandRecomDetail({showBrandID: floorBrandDatas[3].showBrandID}),//4楼品牌推荐
    getBrandRecomDetail({showBrandID: floorBrandDatas[4].showBrandID}),//5楼品牌推荐
    getBrandRecomDetail({showBrandID: floorBrandDatas[5].showBrandID}),//6楼品牌推荐
  ])
  .then(res=>{
    //阿康推荐
    if( res[0].data.data.length >0 ){
      for(let val of res[0].data.data){
        akRecomDetailArr.push(val.productID)
      }
    }
    //楼层1商品推荐
    if( res[1].data.data.length >0 ){
      for(let val of res[1].data.data){
        floorRecomDetailArr1.push(val.productID)
      }
    }
    //楼层2商品推荐
    if( res[2].data.data.length >0 ){
      for(let val of res[2].data.data){
        floorRecomDetailArr2.push(val.productID)
      }
    }
    //楼层3商品推荐
    if( res[3].data.data.length >0 ){
      for(let val of res[3].data.data){
        floorRecomDetailArr3.push(val.productID)
      }
    }
    //楼层4商品推荐
    if( res[4].data.data.length >0 ){
      for(let val of res[4].data.data){
        floorRecomDetailArr4.push(val.productID)
      }
    }
    //楼层5商品推荐
    if( res[5].data.data.length >0 ){
      for(let val of res[5].data.data){
        floorRecomDetailArr5.push(val.productID)
      }
    }
    //楼层6商品推荐
    if( res[6].data.data.length >0 ){
      for(let val of res[6].data.data){
        floorRecomDetailArr6.push(val.productID)
      }
    }
    //楼层1品牌推荐
    if( res[7].data.data.length >0 ){
      for( let y=0; y<res[7].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr1.push(res[7].data.data[y])
      }
    }
    //楼层2品牌推荐
    if( res[8].data.data.length >0 ){
      for( let y=0; y<res[8].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr2.push(res[8].data.data[y])
      }
    }
    //楼层3品牌推荐
    if( res[9].data.data.length >0 ){
      for( let y=0; y<res[9].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr3.push(res[9].data.data[y])
      }
    }
    //楼层4品牌推荐
    if( res[10].data.data.length >0 ){
      for( let y=0; y<res[10].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr4.push(res[10].data.data[y])
      }
    }
    //楼层5品牌推荐
    if( res[11].data.data.length >0 ){
      for( let y=0; y<res[11].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr5.push(res[11].data.data[y])
      }
    }
    //楼层6品牌推荐
    if( res[12].data.data.length >0 ){
      for( let y=0; y<res[12].data.data.length; y++ ){
        //只显示6个
        if( y>5 ){ break; }
        brandRecomDetailArr6.push(res[12].data.data[y])
      }
    }
  })
  .catch(err=>{
    console.log('获取阿康推荐详细出错', err)
  })
  
  // await getProRecomDetail({showID: akRecomDatas[0].showID})
  // .then(res=>{
  //   // console.log('获取阿康推荐详细: ', res)
  //   if( res.data.data.length <=0 ){
  //     return
  //   }
  //   // akRecomDetailArr = res.data.data
  //   for(let val of res.data.data){
  //     akRecomDetailArr.push(val.productID)
  //   }
  // })
  // .catch(err=>{
  //   console.log('获取阿康推荐详细出错', err)
  // })
  
  // if( akRecomDetailArr.length>0 ){
  //   await getPros({productNumbers: akRecomDetailArr})
  //   .then(res=>{
  //     // console.log('获取阿康推荐列表： ', res)
  //     if( res.data.success && res.data.data.length>0 ){
  //       akRecomProducts = res.data.data;
  //     }
  //   })
  //   .catch(err=>{
  //     console.log('获取阿康推荐产品列表出错，', err)
  //   })
  // }
  
  await axiosAll([
    getPros({productNumbers: akRecomDetailArr}),
    getPros({productNumbers: floorRecomDetailArr1}),
    getPros({productNumbers: floorRecomDetailArr2}),
    getPros({productNumbers: floorRecomDetailArr3}),
    getPros({productNumbers: floorRecomDetailArr4}),
    getPros({productNumbers: floorRecomDetailArr5}),
    getPros({productNumbers: floorRecomDetailArr6})
  ])
  .then(res=>{
    if( res[0].data.success && res[0].data.data.length>0 ){
      akRecomProducts = res[0].data.data;
    }
    if( res[1].data.success && res[1].data.data.length>0 ){
      floorProducts1 = res[1].data.data;
    }
    if( res[2].data.success && res[2].data.data.length>0 ){
      floorProducts2 = res[2].data.data;
    }
    if( res[3].data.success && res[3].data.data.length>0 ){
      floorProducts3 = res[3].data.data;
    }
    if( res[4].data.success && res[4].data.data.length>0 ){
      floorProducts4 = res[4].data.data;
    }
    if( res[5].data.success && res[5].data.data.length>0 ){
      floorProducts5 = res[5].data.data;
    }
    if( res[6].data.success && res[6].data.data.length>0 ){
      floorProducts6 = res[6].data.data;
    }

  })
  .catch(err=>{
    console.log('获取阿康推荐产品列表出错，', err)
  })
  
  await ctx.render('index/index', {
    keywords: '药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '网上买药找药去哪个网站？药房网、网上药店、处方药网购哪个好？买药品最正规的网站【阿康大药房】经国家药监局批准的专业药房网,可选同仁堂等品牌产品的网上药店!-阿康大药房',//页面描述
    title: '阿康大药房',//页面标题
    //传到模板的数据
    renderData: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      bannerDatas,//首页轮播
      cateList: ctx.state.cateList || '',//分类列表数据
      akRecomProducts, //阿康推荐产品
      floorName,// 楼层名称
      floorBotAdv,// 楼层底部广告
      floorProducts1,//楼层商品推荐
      floorProducts2,//楼层商品推荐
      floorProducts3,//楼层商品推荐
      floorProducts4,//楼层商品推荐
      floorProducts5,//楼层商品推荐
      floorProducts6,//楼层商品推荐
      advImgLDatas,// 楼层大图广告
      advImgSDatas,// 楼层小图广告
      floorBrandDatas,//楼层品牌推荐
      brandRecomDetailArr1,//楼层1品牌推荐
      brandRecomDetailArr2,//楼层2品牌推荐
      brandRecomDetailArr3,//楼层3品牌推荐
      brandRecomDetailArr4,//楼层4品牌推荐
      brandRecomDetailArr5,//楼层5品牌推荐
      brandRecomDetailArr6,//楼层6品牌推荐
    },
  })
})

//找药
router.get('/finddrug.html', async (ctx, next)=>{
  let drugList = '';

  await getALLDisease({
    page: 1,
    limit: 100,
  })
  .then(res=>{
    // console.log('找药列表： ', res)
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
    renderData: { 
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
    renderData: { 
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
