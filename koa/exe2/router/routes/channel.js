const router = require('koa-router')()
const {_req} = require('../../api/apiConfig.js');
const axiosAll = _req.axiosAll;
const { getAdvRecom, getProRecom, getProRecomDetail } = require('../../api/recommend/')
const { getPros } = require('../../api/product/')

//频道页- 慢病药馆
router.get('/chronic.html', async (ctx, next)=>{
    let bannerDatas = '', proRecomDatas = '', recomProducts = '', tuiJian = '';
  
    await axiosAll([getAdvRecom({pageNo: 'pcmanbing'}), getProRecom({pageNo: 'pcChronicTuiJian'}), getAdvRecom({pageNo: 'pcChronicTuiJian'})])
    .then(res=>{
      // console.log('全部res - 0： ', res[0].data.data)
      bannerDatas = res[0].data.data;
  
      // console.log('全部res - 1： ', res[1].data)
      proRecomDatas = res[1].data.data;
      // console.log('akRecomProducts1-1: ')
  
      //慢病推荐广告
      tuiJian = res[2].data.data;
    })
    .catch(err=>{
      console.log('获取轮播图或获取阿康推荐出错了， ', err)
    })
  
    let proRecomDetailArr = [];
    await getProRecomDetail({showID: proRecomDatas[0].showID})
    .then(res=>{
      // console.log('获取阿康推荐详细: ', res)
      if( res.data.data.length <=0 ){
        return
      }
      // proRecomDetailArr = res.data.data
      for(let val of res.data.data){
        proRecomDetailArr.push(val.productID)
      }
    })
    .catch(err=>{
      console.log('获取阿康推荐详细出错', err)
    })
          
    if( proRecomDetailArr.length>0 ){
      await getPros({productNumbers: proRecomDetailArr})
      .then(res=>{
        // console.log('获取阿康推荐列表： ', res)
        if( res.data.success && res.data.data.length>0 ){
          recomProducts = res.data.data;
        }
      })
      .catch(err=>{
        console.log('获取阿康推荐产品列表出错，', err)
      })
    }
  
    //列表
    let listRecomDatas = '', listRecomDetailArr = [], listRroducts = '';
    await getProRecom({pageNo: 'pManBingList'})
    .then(res=>{
      console.log('获取慢病商品列表: ', res)
      if( !res.data.success || res.data.data.length===0 ){
          return false;
      };
      listRecomDatas = res.data.data;
    })
    .catch(err=>{
      console.log('获取慢病商品列表出错了', err)
    })
    await getProRecomDetail({showID: listRecomDatas[0].showID})
    .then(res=>{
      // console.log('获取阿康推荐详细: ', res)
      if( res.data.data.length <=0 ){
        return
      }
      // listRecomDetailArr = res.data.data
      for(let val of res.data.data){
        listRecomDetailArr.push(val.productID)
      }
    })
    .catch(err=>{
      console.log('获取慢病商品列表出错了', err)
    })
    if( listRecomDetailArr.length>0 ){
      await getPros({productNumbers: listRecomDetailArr})
      .then(res=>{
        // console.log('获取阿康推荐列表： ', res)
        if( res.data.success && res.data.data.length>0 ){
          listRroducts = res.data.data;
        }
      })
      .catch(err=>{
        console.log('获取阿康推荐产品列表出错，', err)
      })
    }
    
    await ctx.render('channel/chronic', {
      keywords: '慢病药馆, 慢病,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
      description: '',//页面描述
      title: '阿康大药房-慢病药馆',//页面标题
      //传到模板的数据
      renderData: { 
        cateList: ctx.state.cateList || '',//分类列表数据
        bannerDatas,
        recomProducts,
        tuiJian,
        listRroducts,
      },
    })
  });

//女性频道
router.get('/woman.html', async (ctx, next)=>{
  let bannerDatas = '', proRecomDatas = '', floorNames = '', floorAdvs = '';

  await axiosAll([ getAdvRecom({pageNo: 'pc_woman_banner'}), getAdvRecom({pageNo: 'pc_woman_flName'}), getAdvRecom({pageNo: 'pc_woman_flBanner'}), getProRecom({pageNo: 'pc_woman_flProduct'}) ])
  .then(res=>{
    //轮播图
    bannerDatas = res[0].data.data;
    //楼层名称
    floorNames = res[1].data.data;
    //楼层广告
    floorAdvs = res[2].data.data;
    //楼层商品
    proRecomDatas = res[3].data.data;
  })
  .catch(err=>{
    console.log('女性频道推荐出错了， ', err)
  })
  
  // console.log(222, proRecomDatas)
  let proRecomDetailArr = [];
  if(proRecomDatas.length>0){
    for(let val of proRecomDatas){
      await getProRecomDetail({showID: val.showID})
      .then(res=>{
        // console.log('获取阿康推荐详细: ', res)
        if( res.data.data.length <=0 ){
          return
        }
        proRecomDetailArr.push(res.data.data)
      })
      .catch(err=>{
        console.log('女性频道商品详细出错', err)
      })
    }
  }
  
  let recomProducts = [];
  if( proRecomDetailArr.length>0 ){
    for(let val of proRecomDetailArr){
      let proIdArr = [];
      for(let item of val){
        proIdArr.push(item.productID)
      }
      await getPros({productNumbers: proIdArr})
      .then(res=>{
        // console.log('获取阿康推荐列表： ', res)
        if( res.data.success && res.data.data.length>0 ){
          recomProducts.push(res.data.data);
        }
      })
      .catch(err=>{
        console.log('女性频道商品推荐详细出错', err)
      })
    }
  }

  await ctx.render('channel/woman', {
    keywords: '女性药馆, 女性,女性用药,妇科,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-女性频道',//页面标题
    //传到模板的数据
    renderData: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      bannerDatas,
      floorNames,
      floorAdvs,
      recomProducts,
    },
  })
});

//男性频道
router.get('/man.html', async (ctx, next)=>{
  let bannerDatas = '', proRecomDatas = '', floorNames = '', floorAdvs = '';

  await axiosAll([ getAdvRecom({pageNo: 'pc_man_banner'}), getAdvRecom({pageNo: 'pc_man_flName'}), getAdvRecom({pageNo: 'pc_man_flBanner'}), getProRecom({pageNo: 'pc_man_flProduct'}) ])
  .then(res=>{
    //轮播图
    bannerDatas = res[0].data.data;
    //楼层名称
    floorNames = res[1].data.data;
    //楼层广告
    floorAdvs = res[2].data.data;
    //楼层商品
    proRecomDatas = res[3].data.data;
  })
  .catch(err=>{
    console.log('男性频道推荐出错了， ', err)
  })
  
  let proRecomDetailArr = [];
  if(proRecomDatas.length>0){
    for(let val of proRecomDatas){
      await getProRecomDetail({showID: val.showID})
      .then(res=>{
        if( res.data.data.length <=0 ){
          return
        }
        proRecomDetailArr.push(res.data.data)
      })
      .catch(err=>{
        console.log('男性频道商品推荐详细出错', err)
      })
    }
  }
  
  let recomProducts = [];
  if( proRecomDetailArr.length>0 ){
    for(let val of proRecomDetailArr){
      let proIdArr = [];
      for(let item of val){
        proIdArr.push(item.productID)
      }
      await getPros({productNumbers: proIdArr})
      .then(res=>{
        if( res.data.success && res.data.data.length>0 ){
          recomProducts.push(res.data.data);
        }
      })
      .catch(err=>{
        console.log('男性频道商品推荐产品列表出错，', err)
      })
    }
  }

  await ctx.render('channel/man', {
    keywords: '男性药馆, 男性,男性用药,男科,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-男性频道',//页面标题
    //传到模板的数据
    renderData: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      bannerDatas,
      floorNames,
      floorAdvs,
      recomProducts,
    },
  })
});

//冷链频道
router.get('/coldchain.html', async (ctx, next)=>{
  let bannerDatas = '', proRecomDatas = '', floorNames = '', floorAdvs = '';

  await axiosAll([ getAdvRecom({pageNo: 'pc_coldChain_banner'}), getAdvRecom({pageNo: 'pc_coldChain_flName'}), getAdvRecom({pageNo: 'pc_coldChain_flBanner'}), getProRecom({pageNo: 'pc_coldChain_flProduct'}) ])
  .then(res=>{
    //轮播图
    bannerDatas = res[0].data.data;
    //楼层名称
    floorNames = res[1].data.data;
    //楼层广告
    floorAdvs = res[2].data.data;
    //楼层商品
    proRecomDatas = res[3].data.data;
  })
  .catch(err=>{
    console.log('冷链频道推荐出错了， ', err)
  })
  
  let proRecomDetailArr = [];
  if(proRecomDatas.length>0){
    for(let val of proRecomDatas){
      await getProRecomDetail({showID: val.showID})
      .then(res=>{
        if( res.data.data.length <=0 ){
          return
        }
        proRecomDetailArr.push(res.data.data)
      })
      .catch(err=>{
        console.log('冷链频道商品推荐详细出错', err)
      })
    }
  }
  
  let recomProducts = [];
  if( proRecomDetailArr.length>0 ){
    for(let val of proRecomDetailArr){
      let proIdArr = [];
      for(let item of val){
        proIdArr.push(item.productID)
      }
      await getPros({productNumbers: proIdArr})
      .then(res=>{
        if( res.data.success && res.data.data.length>0 ){
          recomProducts.push(res.data.data);
        }
      })
      .catch(err=>{
        console.log('冷链频道商品推荐产品列表出错，', err)
      })
    }
  }

  await ctx.render('channel/coldChain', {
    keywords: '冷链药馆, 冷链,冷链药品,,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-冷链频道',//页面标题
    //传到模板的数据
    renderData: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      bannerDatas,
      floorNames,
      floorAdvs,
      recomProducts,
    },
  })
});

//注射液频道
router.get('/injection.html', async (ctx, next)=>{
  let bannerDatas = '', proRecomDatas = '', floorNames = '', floorAdvs = '';

  await axiosAll([ getAdvRecom({pageNo: 'pc_injection_banner'}), getAdvRecom({pageNo: 'pc_injection_flName'}), getAdvRecom({pageNo: 'pc_injection_flBanner'}), getProRecom({pageNo: 'pc_injection_flProduct'}) ])
  .then(res=>{
    //轮播图
    bannerDatas = res[0].data.data;
    //楼层名称
    floorNames = res[1].data.data;
    //楼层广告
    floorAdvs = res[2].data.data;
    //楼层商品
    proRecomDatas = res[3].data.data;
  })
  .catch(err=>{
    console.log('注射液频道推荐出错了， ', err)
  })
  
  let proRecomDetailArr = [];
  if(proRecomDatas.length>0){
    for(let val of proRecomDatas){
      await getProRecomDetail({showID: val.showID})
      .then(res=>{
        if( res.data.data.length <=0 ){
          return
        }
        proRecomDetailArr.push(res.data.data)
      })
      .catch(err=>{
        console.log('注射液频道商品推荐详细出错', err)
      })
    }
  }
  
  let recomProducts = [];
  if( proRecomDetailArr.length>0 ){
    for(let val of proRecomDetailArr){
      let proIdArr = [];
      for(let item of val){
        proIdArr.push(item.productID)
      }
      await getPros({productNumbers: proIdArr})
      .then(res=>{
        if( res.data.success && res.data.data.length>0 ){
          recomProducts.push(res.data.data);
        }
      })
      .catch(err=>{
        console.log('注射液频道商品推荐产品列表出错，', err)
      })
    }
  }

  await ctx.render('channel/injection', {
    keywords: '注射液药馆, 注射液,注射液药品,,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房-阿康大药房',//页面关键字
    description: '',//页面描述
    title: '阿康大药房-注射液频道',//页面标题
    //传到模板的数据
    renderData: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      bannerDatas,
      floorNames,
      floorAdvs,
      recomProducts,
    },
  })
});


module.exports = router