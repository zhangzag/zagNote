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
      renderDada: { 
        cateList: ctx.state.cateList || '',//分类列表数据
        bannerDatas,
        recomProducts,
        tuiJian,
        listRroducts,
      },
    })
  });

  module.exports = router