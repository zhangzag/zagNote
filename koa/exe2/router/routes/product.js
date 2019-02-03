const router = require('koa-router')()

router.prefix('/products');

const axiosAll = require('../../api/apiConfig.js')._req.axiosAll;
const { getProList, getBrandList, getProByProductNumber } = require('../../api/product/');

//产品列表页
router.get(['/', '/list.html'], async (ctx, next)=>{
    let proList = '';//商品列表
    let brandList = '';//商品列表
    let params = ctx.query || '';
    let crumbBar = {};//面包屑

    if(params.productTypeOne){
        let typeOne = ctx.state.cateList.find((val, index, arr)=>{
            return val.productTypeID == params.productTypeOne;
        });
        crumbBar.productTypeOne = typeOne;

        if( typeOne && params.productTypeTwo){
            let typeTwo = typeOne.productTypeList.find((valTwo, indexTwo, arrTwo)=>{
                return valTwo.productTypeID == params.productTypeTwo;
            })
            crumbBar.productTypeTwo = typeTwo;
        }
    }

    await axiosAll([
        getBrandList({page:1, limit: 60}), 
        getProList({
            page:1, 
            limit: 20,
			productName: params.productName || '', //产品名称
			isImport: '', //是否进口
			productDrugType: '', // 剂型
			brandId: '', //品牌
			lowestPrice: '',//最低价格
			highest: '',//最高价格
			productType_one: params.productTypeOne || '',//父级ID
			productType_two: params.productTypeTwo || '',//当前科室ID
			sysNo: 'pc', //终端
        })
    ])
    .then(res=>{
        //品牌列表
        if(res[0].data.success){
            brandList = res[0].data.data;
        }

        //商品列表
        if( res[1].data.data.length ){
            proList = res[1].data;
        }
    })
    .catch(err=>{
        console.log('获取品牌或商品列表出错了', err)
    })

    await ctx.render('product/list', {
      keywords: '啦啦啦',//页面关键字
      description: '哈哈哈',//页面描述
      title: '阿康大药房-商品列表',//页面标题
      //传到模板的数据
      renderData: { 
        crumbBar: crumbBar,//面包屑, 一级分类和二级分类数据
        brandList: brandList || '', //品牌列表
        proList: proList || '',//商品列表
        cateList: ctx.state.cateList || '',//分类列表数据
        curList: 1,//当前所在位置 对应左边导航条的行位置 1 - 个人资料
      },
    })
})

let productInfo = '';
router.get('/:productNumber.html', async (ctx, next)=>{
    // console.log(11111, ctx.params);
    let params = ctx.params;
    let productNumber = params.productNumber;

    await getProByProductNumber({productNumber})
    .then(res=>{
        // console.log('查询商品信息： ', res)
        
        if(res.data.data == null){    
            //没有商品信息
            return false;
        }
        productInfo = res.data.data;
    })
    .catch(err=>{
        console.log('查找商品信息出错了', err)
    })   
    
    //面包屑
    let crumbBar = {};
    let typeOne = ctx.state.cateList.find((val, index, arr)=>{
        return val.productTypeName == productInfo.productTypeOne;
    });
    crumbBar.productTypeOne = typeOne;

    if( typeOne && productInfo.productTypeTwo){
        let typeTwo = typeOne.productTypeList.find((valTwo, indexTwo, arrTwo)=>{
            return valTwo.productTypeName == productInfo.productTypeTwo;
        })
        crumbBar.productTypeTwo = typeTwo;
    }

    await ctx.render('product/detail', {
        keywords: '啦啦啦',//页面关键字
        description: '哈哈哈',//页面描述
        title: '阿康大药房-商品详情',//页面标题
        //传到模板的数据
        renderData: { 
          cateList: ctx.state.cateList || '',//分类列表数据
          productInfo,
          crumbBar,
        },
    })
})
//接口 - 获取商品信息
router.get('/pro', async (ctx, next)=>{
    if(!productInfo){
        ctx.body = {
            state: 'success',
            msg: '没有商品信息',
            data: ''
        }
        return false;
    }
    ctx.body = {
        state: 'success',
        msg: '获取商品信息成功',
        data: productInfo
    };
})

module.exports = router