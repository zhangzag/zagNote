const router = require('koa-router')()

const passport = require('koa-passport');
const { getAdvRecom, getProRecom, getProRecomDetail, axiosAll } = require('../../api/recommend/')
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
  // const sha256 = require('sha-256-js');
  // let memberInfo = '';//会员信息

  //获取用户信息
  // if( getCookieByKey(ctx, '_sami') ){
  //   getMemberInfo({
  //     id: getCookieByKey(ctx, '_sami'),
  //     headers: {Authorization: sha256(getCookieByKey(ctx, '_sami') + 'akjk')}
  //   })
  //   .then(res=>{
  //     // console.log('获取会员信息： ', res.data)
  //     if(!res.data){ console.log('没有会员信息，', res);return; }

  //     memberInfo = res.data;
  //   })
  //   .catch(err=>{
  //     console.log('获取会员信息出错了： ', err)
  //   })
  // }

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

  //轮播图
  // await getAdvRecom({pageNo: 'indBanners'})
  // .then(res=>{
  //   if( !res.data.success || res.data.data.length === 0 ){
  //     return false;
  //   }
  //   bannerDatas = res.data.data;
  //   // console.log('bannerDatas: ', bannerDatas)
  // })
  // .catch(err=>{
  //   console.log('获取banner 报错，', err)
  // })

  //阿康推荐
  // let akRecomDatas = '';
  // await getProRecom({pageNo: 'pakRecom'})
  // .then(res=>{
  //   if( !res.data.success || res.data.data.length === 0 ){
  //     return false;
  //   }
  //   akRecomDatas = res.data.data;
  //   // console.log('akRecomDatas: ', akRecomDatas)
  // })
  // .catch(err=>{
  //   console.log('获取阿康推荐出错', err)
  // })
  console.log('akRecomDatas: ', akRecomDatas)
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
    keywords: '啦啦啦',//页面关键字
    description: '哈哈哈',//页面描述
    title: '首页',//页面标题
    //传到模板的数据
    renderDada: { 
      memberInfo: ctx.state.memberInfo || '',//会员信息
      bannerDatas,//首页轮播
      cateList: ctx.state.cateList || '',//分类列表数据
      akRecomProducts, //阿康推荐产品
    },
  })
})

//登录页
router.get('/login.html', async (ctx, next)=>{
  await ctx.render('login/index', {
    keywords: '阿康大药房登录页面',//页面关键字
    description: '阿康大药房，登录，忘记密码，注册',//页面描述
    title: '阿康大药房-登录',//页面标题
    //传到模板的数据
    renderDada: { 
      // bannerDatas,//首页轮播
      // cateList: ctx.state.cateList || '',//分类列表数据
      // akRecomProducts, //阿康推荐产品
    },
  })
});
//登录接口
router.post('/toLogin', async (ctx, next)=>{
  let account = ctx.request.body;

  if(!account){
    ctx.throw(500, '出错了，缺少账号参数');
  }

  let username = account.username, password = account.password;
  if( !username ){
    ctx.throw(500, '出错了，缺少账号参数');
  }
  if( !password ){
    ctx.throw(500, '出错了，缺少密码参数');
  }

  await loginMember({
    username,
    password
  })
  .then(res=>{
    // console.log('登录：', res)
    ctx.body = res.data;  
    if( res.data.success ){
      //登录成功 存储信息
      
      //设置cookie
      setCookieByKey( ctx, res.data.memberID )
      //获取cookie
      // console.log(224455, getCookieByKey( ctx, '_sami' ))
    }  
  })
  .catch(err=>{
    console.log('登录出错了, ', err)
    ctx.throw(err.status, err);
  })
})
//退出登录
router.get('/loginOut', async (ctx, next)=>{
  if(removeCookie(ctx, '_sami')){
    //移除cookie
    ctx.body = {
      success: true,
      msg: '已安全退出',
    }
  }else{
    ctx.body = {
      success: false,
      msg: '安全退出出错了'
    }
  };
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
    keywords: '阿康大药房病重分类',//页面关键字
    description: '阿康大药房病重分类',//页面描述
    title: '阿康大药房-找药页',//页面标题
    //传到模板的数据
    renderDada: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      drugList,
    },
  })
});

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
    keywords: '阿康大药房',//页面关键字
    description: '阿康大药房',//页面描述
    title: '阿康大药房-慢病药馆',//页面标题
    //传到模板的数据
    renderDada: { 
      cateList: ctx.state.cateList || '',//分类列表数据
      bannerDatas,
      recomProducts,
      tuiJian,
      listRroducts,
    },
  })
});

//帮助页
router.get('/help-new.html', async (ctx, next)=>{
  await ctx.render('help/help-new.html', {
    keywords: '阿康大药房',//页面关键字
    description: '阿康大药房',//页面描述
    title: '阿康大药房-慢病药馆',//页面标题
    //传到模板的数据
    renderDada: { 
      cateList: ctx.state.cateList || '',//分类列表数据
    },
  })
});

router.get('/string', async (ctx, next) => {
  if( !ctx.isAuthenticated() ){
    ctx.redirect('/users')
  }else{
    ctx.body = '登录 -- ' + JSON.stringify( ctx.state );
  }
})

router.get('/json', async (ctx, next) => {
  ctx.logout()
  ctx.body = '退出 --- ' + JSON.stringify( ctx.state )
})

module.exports = router
