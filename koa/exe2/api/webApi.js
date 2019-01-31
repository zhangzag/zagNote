const router = require('koa-router')()
const { curDate } = require('../util/');
const _reqs = require('./apiConfig.js');
const { getProByProductNumber, getProList } = require('./product/');

let _req = _reqs._req;

//根据productNumber 获取商品信息
router.post('/product/findProductByProductNumber', async (ctx, next)=>{
    let params = ctx.request.body;
    let productNumber = params.productNumber || '';

    if(!productNumber){
        ctx.body = {
            success: false,
            data: '',
            msg: '未找到商品'
        }
        return;
    }

    await getProByProductNumber({productNumber})
    .then(res=>{
        // console.log(res.data)
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取商品信息出错了, ', err.response.status, err.response.data)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取商品列表
router.post('/product/getProductList', async (ctx, next)=>{
    let params = ctx.request.body;
    let page = params.page;
    let limit = params.limit;
    let productName = params.productName || '';//产品名称
    let isImport = params.isImport || '';//是否进口
    let productDrugType = params.productDrugType || '';// 剂型
    let brandId = params.brandId || '';//品牌
    let lowestPrice = params.lowestPrice || '';//最低价格
    let highest = params.highest || '';//最高价格
    let productType_one = params.productType_one || '';//父级ID
    let productType_two = params.productType_two || '';//当前科室ID
    let sysNo = params.sysNo || ''; //终端
    
    await getProList({
        page,limit,productName,isImport,productDrugType,brandId,lowestPrice,highest,productType_one,productType_two,sysNo
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取商品列表出错了', err)
        ctx.throw(err.response.status, err.response.data)
    })
})

module.exports = router