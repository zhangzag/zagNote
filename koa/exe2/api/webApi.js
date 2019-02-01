const router = require('koa-router')()
const SHA256 = require('sha256')
const { curDate } = require('../util/');
const _reqs = require('./apiConfig.js');
const { getProByProductNumber, getProList, getProById } = require('./product/');
const { sendCodeMsg, vipRegister, verifyMapCode, verifyMsgCode } = require('./login/')
const { getFavorite } = require('./member/')

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

//根据商品id获取商品信息
router.post('/product/getProductByProductId', async (ctx, next)=>{
    let params = ctx.request.body;
    let productId = params.productId || '';

    if(!productId && productId!=0){
        ctx.body = {
            success: false,
            data: '',
            msg: '未找到商品'
        }
        return;
    }

    await getProById({productId})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取商品信息出错了, ', err.response.status, err.response.data)
        ctx.throw(err.response.status, err.response.data);
    })
})

//短信验证
router.post('/sendCodeMessage', async (ctx, next)=>{
    let params = ctx.request.body;
    let telephone = params.telephone || '';
    let code = params.code || ''

    if( !telephone || !code ){
        ctx.body = {
            success: false,
            msg: '缺少电话或是图形验证码'
        }
        return;
    }

    await sendCodeMsg({telephone, code})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取短信验证码出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//会员注册
router.post('/vipRegisterInsert', (ctx, next)=>{
    let params = ctx.request.body;
    let telephone = params.telephone; //电话号码
    let randomCodeTwo = params.randomCodeTwo; //短信验证码
    let password = params.password;//密码
    let code = params.code;

    if(!telephone){
        xtx.body = {
            success: false,
            msg: '请输入电话号码'
        }
        return
    }
    if(!randomCodeTwo){
        xtx.body = {
            success: false,
            msg: '请输入短信验证码'
        }
        return
    }
    if(!password){
        xtx.body = {
            success: false,
            msg: '请输入密码'
        }
        return
    }
    if(!code){
        xtx.body = {
            success: false,
            msg: '请输入图形验证码'
        }
        return
    }

    vipRegister({telephone, randomCodeTwo, password, code})
    .then(res=>{
        ctx.body = res.data
    })
    .catch(err=>{
        console.log('注册会员出错了,', err)
        ctx.throw(err.response.status, err.response.data)
    })
})

//找回密码 - 验证图形验证码
router.post('/verifyCode', async (ctx, next)=>{
    let params = ctx.request.body;
    let telephone = params.telephone || '';
    let code = params.code || ''

    if( !telephone || !code ){
        ctx.body = {
            success: false,
            msg: '缺少电话或是图形验证码'
        }
        return;
    }

    await verifyMapCode({telephone, code})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('验证图形验证码出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//找回密码 - 验证短信验证码
router.post('/verifyMessage', async (ctx, next)=>{
    let params = ctx.request.body;
    let telephone = params.telephone || '';
    let randomCode = params.randomCode || '';

    if( !telephone || !randomCode ){
        ctx.body = {
            success: false,
            msg: '缺少电话或是短信验证码'
        }
        return;
    }

    await verifyMsgCode({telephone, randomCode})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('验证短信验证码出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//找回密码 - 改密码 changeNewPwd
router.post('/changePassword', async (ctx, next)=>{
    let params = ctx.request.body;
    let telephone = params.telephone || '';
    let randomCodeTwo = params.randomCodeTwo || '';
    let password = params.password || '';

    if( !telephone || !randomCodeTwo || !password ){
        ctx.body = {
            success: false,
            msg: '缺少手机号码,密码或是短信验证码'
        }
        return;
    }

    await changeNewPwd({telephone, randomCodeTwo, password})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('改密码出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})
 
//我的收藏 
router.post('/favorite/getFavoriteList', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await getFavorite({memberId, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取我的收藏出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

module.exports = router