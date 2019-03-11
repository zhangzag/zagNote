/** 
 * 
 *提供前端调用的接口 
 **/

const router = require('koa-router')()
const SHA256 = require('sha256')
const { curDate } = require('../util/');
const _reqs = require('./apiConfig.js');
const { getProByProductNumber, getProList, getProById } = require('./product/');
const { sendCodeMsg, vipRegister, verifyMapCode, verifyMsgCode, changeNewPwd } = require('./login/')
const { getFavorite, getMyOrder, getMyOrderByStatus, cancelOrder, comfireGetOrder, getDeliveryInfo, getOrderDetail, cancelFavorite, cancelFavoriteByArr, getAddress, getSelectArea, addDelivery, toGetDeliveryAddress, toDelDeliveryAddress, setDefaultAddress, toGetPrescript, toGetPrescriptDetail, getMyRequire, getCodeImg, getMemberInfo, updateMemberInfo, toAddPrescript, getMyOrderCount } = require('./member/')
const { toGetSingleCombo, toGetSingleComboDetail, toGetCombo, toGetComboDetail, toAddOrder, toAddPackageOrder, toGetCharge, toGetDiscount, toAddRequire, toDelRequire } = require('./product/')
const { getHotSearc, getHotSearcDetail } = require('./header/');

let _req = _reqs._req;

//获取热门搜索
router.post('/getHotSearchByProductTypeID', async (ctx, next)=>{
    let params = ctx.request.body;
    let productTypeID = params.productTypeID || '';
    let type = params.type || '';

    await getHotSearc({ productTypeID, type })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取热门搜索出错了, ', err.response.status, err.response.data)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取热门搜索详情
router.post('/getHSDetailByParams', async (ctx, next)=>{
    let params = ctx.request.body;
    let searchID = params.searchID || '';
    let type = params.type || '';

    await getHotSearcDetail({ searchID, type })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取热门搜索详情出错了, ', err.response.status, err.response.data)
        ctx.throw(err.response.status, err.response.data);
    })
})

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

//找回密码 - 改密码
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

//我的订单统计
router.post('/order/getOrderCount', async (ctx, next)=>{
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
    await getMyOrderCount({memberId, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取我的订单统计出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取我的订单
router.post('/order/getOrderByMemberId', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';
    let page = params.page || 1;
    let limit = params.limit || 10;
    let recentDate = params.recentDate || '';//按时间搜索订单
    let orderCodeOrProName = params.orderCodeOrProName || '';//订单编号或商品名称收藏订单

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await getMyOrder({
        memberId, 
        page: 1,
        limit: 10,
        recentDate,
        orderCodeOrProName,
        headers: {'Authorization': shaMemberId, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取我的订单出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//根据订单状态获取我的订单
router.post('/order/getOrderByMemberIdAndStatus', async (ctx, next)=>{
    let params = ctx.request.body ||'';
    let memberId = ctx.state.memberInfo.memberID || '';
    // let data = params.data || '';

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await getMyOrderByStatus({
        datas: JSON.stringify(params),
        headers: {'Authorization': shaMemberId, 'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res=>{
        // console.log('根据状态获取订单： ', res)
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取我的订单出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取订单详情
router.post('/order/getOrderInfoByOrderId', async (ctx, next)=>{
    let params = ctx.request.body;
    let orderID = params.orderID || '';
    let memberId = ctx.state.memberInfo.memberID || '';

    if(!orderID && orderID!=0){
        ctx.body = {
            success: false,
            data: '',
            msg: '未找到该订单号'
        }
        return;
    }
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await getOrderDetail({orderID, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取订单详情出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//取消订单
router.post('/order/updateOrderStatusByCancel', async (ctx, next)=>{
    let params = ctx.request.body;
    let orderId = params.orderId || '';
    let memberId = ctx.state.memberInfo.memberID || '';
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await cancelOrder({orderId, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('取消订单出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})
 
//确认订单收货
router.post('/order/updateOrderStatusByConfirmReceipt', async (ctx, next)=>{
    let params = ctx.request.body;
    let orderId = params.orderId || '';
    let memberId = ctx.state.memberInfo.memberID || '';
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await comfireGetOrder({orderId, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('确认订单收货出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})
 
//获取物流信息
router.post('/delivery/getLogistics', async (ctx, next)=>{
    let params = ctx.request.body;
    let logisticsNo = params.logisticsNo || '';
    let logisticsCode = params.logisticsCode || '';
    let memberId = ctx.state.memberInfo.memberID || '';
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await getDeliveryInfo({logisticsNo, logisticsCode, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取物流信息出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//我的收藏 
router.post('/favorite/getFavoriteList', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';
    let page = params.page || 1;
    let limit = params.limit || 10;

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await getFavorite({memberId, page, limit, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取我的收藏出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//取消收藏  cancelFavorite
router.post('/favorite/delFavoriteBymemberIdAndProId', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';
    let productId = params.productId || '';

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }
    
    let shaMemberId = SHA256( memberId + 'akjk' );
    await cancelFavorite({memberId, productId, headers: {'Authorization': shaMemberId}})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('取消我的收藏出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//取消收藏 - 多选
router.post('/favorite/delFavorite', async (ctx, next)=>{
    let params = ctx.request.body ||'';
    let memberId = ctx.state.memberInfo.memberID || '';

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await cancelFavoriteByArr({
        datas: JSON.stringify(params),
        headers: {'Authorization': shaMemberId, 'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('取消多选收藏出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//套餐
router.post('/getComboByProductId', async (ctx, next)=>{
    let params = ctx.request.body || '';
    let productID = params.productID;

    if( !productID && productID != 0 ){
        ctx.body = {
            success: false,
            msg: '未找到商品'
        }
        return;
    }

    await toGetCombo({
        productID
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取套餐出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//套餐详情
router.post('/getComboDetailByPackageId', async (ctx, next)=>{
    let params = ctx.request.body || '';
    let packageID = params.packageID;

    if( !packageID && packageID != 0 ){
        ctx.body = {
            success: false,
            msg: '未找到商品'
        }
        return;
    }

    await toGetComboDetail({
        packageID
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取套餐详情出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取收货地址
router.get('/delivery/getDeliveryAddress', async (ctx, next)=>{
    let params = ctx.query;
    let memberId = params.memberId || '';
    
    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await getAddress({
        memberId,
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取收货地址出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取省市区
router.post('/selectArea', async (ctx, next)=>{
    let params = ctx.request.body;
    let parentId = params.parentId || '';
    
    await getSelectArea({parentId})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取省市区出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//addDelivery
router.post('/delivery/addDeliveryAddress', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberID = params.memberID || '';//会员id
    let isDefault = params.isDefault || ''; //是否默认地址
    let countryID = params.countryID || 1; //国家编码, 默认中国
    let districtID = params.districtID || ''; //省、直辖市
    let city = params.city || ''; //市县
    let county = params.county || ''; //区、县
    let address = params.address || '';//街道地址
    let mobile = params.mobile || '';//移动电话
    let telephone = params.telephone || ''; //固定电话
    let phone = params.phone || '';
    let contactMan = params.contactMan || '';//联系人
    let addressID = params.addressID || '';//编辑地址ID 不是编辑时不传

    console.log('params:  ', params)

    if( !memberID ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberID + 'akjk' );
    await addDelivery({
        memberID,//会员id
        isDefault, //是否默认地址
        countryID, //国家编码, 默认中国
        districtID, //省、直辖市
        city, //市县
        county, //区、县
        address,//街道地址
        mobile,//移动电话
        telephone, //固定电话
        phone,
        contactMan,//联系人
        addressID,//编辑地址ID 不是编辑时不传
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('增加收货地址出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//通过会员获取收货地址
router.get('/delivery/getDeliveryAddressByMemberID', async (ctx, next)=>{
    let params = ctx.query;
    let memberID = params.memberID || '';
    let addressID = params.addressID || '';
    
    if( !memberID ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberID + 'akjk' );
    await toGetDeliveryAddress({
        memberID,
        addressID,
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('通过会员获取收货地址出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//删除收货地址 
router.post('/delivery/delDeliveryAddress', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberID = params.memberID || '';
    let addressID = params.addressID || '';

    if( !memberID ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberID + 'akjk' );
    await toDelDeliveryAddress({
        memberID,
        addressID,
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('删除收货地址出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//设置默认收货地址 
router.post('/delivery/isDefualt', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberID = params.memberID || '';
    let addressID = params.addressID || '';
    let isDefault = params.isDefault || 0;

    if( !memberID ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }
    if( !addressID ){
        ctx.body = {
            success: false,
            msg: '没有选择收货地址'
        }
        return;
    }

    let shaMemberId = SHA256( memberID + 'akjk' );
    await setDefaultAddress({
        memberID,
        addressID,
        isDefault,
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('设置默认收货地址出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//提交处方笺
router.post('/prescription/addPrescription', async (ctx, next)=>{
    let params = ctx.request.body;
    
    await toAddPrescript(params)
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('提交处方笺出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取处方笺列表
router.post('/prescription/getPrescription', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';
    let page = params.page || 1;
    let limit = params.limit || 10;

    if( !memberId ){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return;
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await toGetPrescript({
        memberId,
        page,
        limit,
        headers: {'Authorization': shaMemberId}
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取处方笺列表出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取处方笺详情
router.post('/prescription/getPrescriptionById', async (ctx, next)=>{
    let params = ctx.request.body;
    let prescriptionId = params.prescriptionId;

    if(!prescriptionId && prescriptionId!=0){
        ctx.body = {
            success: false,
            msg: '未获取到处方笺'
        }
        return
    }

    await toGetPrescriptDetail({ prescriptionId })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取处方笺列表出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取我的需求登记列表
router.post('/require/getRequire', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId;
    let page = params.page;
    let limit = params.limit;

    if(!memberId && memberId!=0){
        ctx.body = {
            success: false,
            msg: '未获找到会员信息'
        }
        return
    }

    let shaMemberId = SHA256( memberId + 'akjk' );
    await getMyRequire({ 
        memberId,
        page,
        limit,
        headers: {'Authorization': shaMemberId}   
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取处方笺列表出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取疗程装
router.post('/getSingleComboByProductId', async (ctx, next)=>{
    let params = ctx.request.body;
    let productID = params.productID || '';

    if(!productID && productID!=0){
        ctx.body = {
            success: false,
            msg: '未获找到商品'
        }
        return
    }

    await toGetSingleCombo({productID})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取疗程装出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取疗程装详情
router.post('/toGetSingleComboDetail', async (ctx, next)=>{
    let params = ctx.request.body;
    let packageID = params.packageID || '';

    if(!packageID && packageID!=0){
        ctx.body = {
            success: false,
            msg: '未获找到疗程装'
        }
        return
    }

    await toGetSingleComboDetail({packageID})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取疗程装出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//提交订单
router.post('/order/addorder', async (ctx, next)=>{
    let params = ctx.request.body;
    let productId = params.productId || '';//订单ID
    let memberId = params.memberId || '';//会员ID
    let detailCodeId = params.detailCodeId || '';//多规格id
    let qty = params.qty || '';//商品数量
    let addressID = params.addressID || '';//地址编号
    let deliveryAddress = params.deliveryAddress || '';//配送详细地址
    let logisticsID = params.logisticsID || '';//物流公司
    let payType = params.payType || '';//支付方式 目前固定为 4 - 货到付款
    let orderRemark = params.orderRemark || '';//客户留言
    let sysNo = params.sysNo || 'pc';

    if(!productId && productId!=0){
        ctx.body = {
            success: false,
            msg: '未获找到商品'
        }
        return
    }
    if(!memberId && memberId!=0){
        ctx.body = {
            success: false,
            msg: '请先登录'
        }
        return
    }

    await toAddOrder({
        productId,//订单ID
        memberId,//会员ID
        detailCodeId,//多规格id
        qty,//商品数量
        addressID,//地址编号
        deliveryAddress,//配送详细地址
        logisticsID,//物流公司
        payType,//支付方式 目前固定为 4 - 货到付款
        orderRemark,//客户留言
        sysNo
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('提交订单出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//提交套餐商品订单
router.post('/order/addComboOrder', async (ctx, next)=>{
    let params = ctx.request.body;
    let packageID = params.packageID || '';//订单ID
    let memberId = params.memberId || '';//会员ID
    let qty = params.qty || '';//商品数量
    let addressID = params.addressID || '';//地址编号
    let deliveryAddress = params.deliveryAddress || '';//配送详细地址
    let logisticsID = params.logisticsID || '';//物流公司
    let payType = params.payType || '';//支付方式 目前固定为 4 - 货到付款
    let orderRemark = params.orderRemark || '';//客户留言
    let sysNo = params.sysNo || 'pc';

    if(!packageID && packageID!=0){
        ctx.body = {
            success: false,
            msg: '未获找到商品'
        }
        return
    }
    if(!memberId && memberId!=0){
        ctx.body = {
            success: false,
            msg: '请先登录'
        }
        return
    }

    await toAddPackageOrder({
        packageID,//订单ID
        memberId,//会员ID
        qty,//商品数量
        addressID,//地址编号
        deliveryAddress,//配送详细地址
        logisticsID,//物流公司
        payType,//支付方式 目前固定为 4 - 货到付款
        orderRemark,//客户留言
        sysNo
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('提交套餐订单出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//提交需求登记
router.post('/require/addRequire', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberID = params.memberID || '';
    let sysNo = params.sysNo || 'pc';
    let productID = params.productID || '';
    let productName = params.productName || '';
    let productCode = params.productCode || '';
    let qty = params.qty || '';
    let realName = params.realName || '';
    let phone = params.phone || '';
    let DeliveryAddress = params.DeliveryAddress || '';
    let age = params.age || '';
    let carId = params.carId || ''; 
    let sex = params.sex || '';
    let isStore = params.isStore || '';
    let remark = params.remark || '';
    let imgstr = params.imgstr || '';
    
    await toAddRequire({
        memberID,
        sysNo,
        productID,
        productName,
        productCode,
        qty,
        realName,
        phone,
        DeliveryAddress,
        age,
        carId, 
        sex,
        isStore,
        remark,
        imgstr,
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('提交需求登记出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//删除需求登记
router.post('/require/delRequire', async (ctx, next)=>{
    let params = ctx.request.body;
    let memberId = params.memberId || '';
    let requireId = params.requireId || '';

    if(!memberId && memberId!=0){
        ctx.body = {
            success: false,
            msg: '未找到会员'
        }
        return
    }

    await toDelRequire({memberId, requireId})
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('删除需求登记出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取运费模板
router.post('/order/getLogisticsCharge', async (ctx, next)=>{
    let params = ctx.request.body;
    let addressId = params.addressId || '';
    let orderAMT = params.orderAMT || '';
    let timestamp = params.timestamp || '';
    let sysNo = params.sysNo || 'pc'

    await toGetCharge({
        addressId,
        orderAMT,
        timestamp,
        sysNo
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取运费模板出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取优惠
router.post('/order/getDiscountsPrice', async (ctx, next)=>{
    let params = ctx.request.body;
    let productId = params.productId || '';
    let totalPrice = params.totalPrice || '';
    let qty = params.qty || '';
    let sysNo = params.sysNo || 'pc'

    if(!productId && productId!=0){
        ctx.body = {
            success: false,
            msg: '未获找到商品'
        }
        return
    }

    await toGetDiscount({
        productId,
        totalPrice,
        qty,
        sysNo
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取运费模板出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//获取会员信息
router.post('/vipSearchByID', async (ctx, next)=>{
    let params = ctx.request.body;
    let id = params.id || '';

    if(!id && id!=0){
        ctx.body = {
            success: false,
            msg: '未获找到会员'
        }
        return
    }

    let shaMemberId = SHA256( id + 'akjk' );
    await getMemberInfo({
        id,
        headers: {'Authorization': shaMemberId} 
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('获取会员信息出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})

//更新会员信息
router.post('/updateByMemberId', async (ctx, body)=>{
    let params = ctx.request.body;
    let memberID = params.memberID;//会员id
    let memberName = params.memberName;//会员名称,
    let sex = params.sex;//性别
    let birthday = params.birthday;//出生年月日

    if(!memberID){
        ctx.body = {
            success: false,
            msg: '没有找到会员'
        }
        return
    }

    let shaMemberId = SHA256( memberID + 'akjk' );
    await updateMemberInfo({
        memberID,
        memberName,
        sex,
        birthday,
        headers: {'Authorization': shaMemberId} 
    })
    .then(res=>{
        ctx.body = res.data;
    })
    .catch(err=>{
        console.log('更新会员信息出错了,', err)
        ctx.throw(err.response.status, err.response.data);
    })
})
const FormData = require('form-data');
const fs = require('fs')
const path = require('path')
const FileReader = require('filereader')

//上传头像
// router.post('/upLoadByMemberId', async (ctx, next)=>{
    
// })

module.exports = router