const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;

/**
 * 根据id数组获取产品列表
 *
 * @export
 * @returns
 */
const getPros = function ( {memberId=10299, productNumbers} ){
    return new Promise((resolve, reject)=>{
        if(!productNumbers){reject('没有产品参数');};

        _req({
            url: '/product/getProductByProductNumber',
            data: JSON.stringify({
                memberId,
                productNumbers,
            }),
            headers: {'Content-Type' : 'application/json;charset=utf-8'},
            transformRequest: [function (data) {
                return data
            }]
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 * 根据商品id获取商品
 *
 * @export
 * @returns
 */
const getProById = function ( {productId} ){
    return new Promise((resolve, reject)=>{
        if(!productId){reject('没有商品id');};

        _req({
            url: '/product/getProductByProductId',
            // data: JSON.stringify({
            //     productId,
            // }),
            data: { productId },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 * 获取产品列表
 *
 * @export
 * @returns
 */
const getProList = function ( {page=1, limit=20, productName, isImport=null, productDrugType, brandId, lowestPrice, highest, productType_one, productType_two, sysNo='pc'} ){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/product/getProductList',
            data: {
                page,
                limit,
                productName, //产品名称
                isImport, //是否进口
                productDrugType, // 剂型
                brandId, //品牌
                lowestPrice,//最低价格
                highest,//最高价格
                productType_one,//父级ID
                productType_two,//当前科室ID
                sysNo, //终端
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 * 获取品牌列表
 *
 * @export
 * @returns
 */
const getBrandList = function ( {page=1, limit=60} ){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/brand/getBrandList',
            data: {
                page,
                limit,
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 * 获取找药列表
 *
 * @export
 * @returns
 */
const getALLDisease = function ( {page=1, limit=100} ){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/product/searchALLDisease',
            data: {
                page,
                limit,
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *根据productNumber获取商品信息
 *
 * @param {*} {productNumber}
 * @returns
 */
const getProByProductNumber = function ({productNumber}){
    return new Promise((resolve, reject)=>{
        if(!productNumber && productNumber!=0){reject('没有商品id')}

        _req({
            url: '/product/findProductByProductNumber',
            data: {
                productNumber
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *疗程装
 *
 * @param {*} {productID}
 * @returns
 */
const toGetSingleCombo = function ({productID}){
    return new Promise((resolve, reject)=>{
        if(!productID && productID!=0){reject('没有商品id')}

        _req({
            url: '/getSingleComboByProductId',
            data: {
                productID
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *疗程装详情
 *
 * @param {*} {packageID}
 * @returns
 */
const toGetSingleComboDetail = function ({packageID}){
    return new Promise((resolve, reject)=>{
        if(!packageID && packageID!=0){reject('没有指定疗程装')}

        _req({
            url: '/getComboDetailByPackageId',
            data: {
                packageID
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *套餐
 *
 * @param {*} {productID}
 * @returns
 */
const toGetCombo = function ({productID}){
    return new Promise((resolve, reject)=>{
        if(!productID && productID!=0){reject('没有商品id')}

        _req({
            url: '/getComboByProductId',
            data: {
                productID
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *套餐详情
 *
 * @param {*} {packageID}
 * @returns
 */
const toGetComboDetail = function ({packageID}){
    return new Promise((resolve, reject)=>{
        if(!packageID && packageID!=0){reject('没有套餐id')}

        _req({
            url: '/getComboDetailByPackageId',
            data: {
                packageID
            }
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *提交订单
 *
 * @param {*} {productId, memberId, detailCodeId, qty, addressID, deliveryAddress, logisticsID, payType=4, orderRemark, sysNo="pc"}
 * @returns
 */
const toAddOrder = function ({productId, memberId, detailCodeId, qty, addressID, deliveryAddress, logisticsID, payType=4, orderRemark, sysNo="pc"}){
    return new Promise((resolve, reject)=>{
        if(!productId && productId!=0){reject('没有商品id')}
        if(!memberId && memberId!=0){reject('没有会员id')}

        _req({
            url: '/order/addorder',
            data: {
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
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *提交套餐商品订单
 *
 * @param {*} {packageID, memberId, qty, addressID, deliveryAddress, logisticsID, payType=4, orderRemark, sysNo="pc"}
 * @returns
 */
const toAddPackageOrder = function ({packageID, memberId, qty, addressID, deliveryAddress, logisticsID, payType=4, orderRemark, sysNo="pc"}){
    return new Promise((resolve, reject)=>{
        if(!packageID && packageID!=0){reject('没有商品id')}
        if(!memberId && memberId!=0){reject('没有会员id')}

        _req({
            url: '/order/addComboOrder',
            data: {
                packageID,//订单ID
                memberId,//会员ID
                qty,//商品数量
                addressID,//地址编号
                deliveryAddress,//配送详细地址
                logisticsID,//物流公司
                payType,//支付方式 目前固定为 4 - 货到付款
                orderRemark,//客户留言
                sysNo,
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取 运费模板
 *
 * @param {*} {packageID, memberId, qty, addressID, deliveryAddress, logisticsID, payType=4, orderRemark, sysNo="pc"}
 * @returns
 */
const toGetCharge = function ({addressId, orderAMT, timestamp=curDate, sysNo="pc"}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/order/getLogisticsCharge',
            data: {
                addressId,
                orderAMT,
                timestamp,
                sysNo
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取优惠
 *
 * @param {*} {productId, totalPrice, qty, sysNo="pc"}
 * @returns
 */
const toGetDiscount = function ({productId, totalPrice, qty, sysNo="pc"}){
    return new Promise((resolve, reject)=>{
        if(!productId && productId!=0){reject('没有商品id')}
        _req({
            url: '/order/getDiscountsPrice',
            data: {
                productId,
                totalPrice,
                qty,
                sysNo
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *提交需求登记
 *
 * @param {*} {memberID, sysNo='pc', productID, productName, productCode, qty, realName, phone, DeliveryAddress, age, carId, sex, carId, isStore, remark, imgstr}
 * @returns
 */
const toAddRequire = function ({memberID, sysNo='pc', productID, productName, productCode, qty, realName, phone, DeliveryAddress, age, carId, sex, isStore, remark, imgstr}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/require/addRequire',
            data: {
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
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *删除需求登记
 *
 * @param {*} {memberId, requireId}
 * @returns
 */
const toDelRequire = function ({memberId, requireId}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/require/delRequire',
            data: {
                memberId,
                requireId,
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

module.exports = {
    getPros,
    getProList,
    getBrandList,
    getALLDisease,
    getProByProductNumber,
    getProById,
    toGetSingleCombo,
    toGetSingleComboDetail,
    toGetCombo,
    toGetComboDetail,
    toAddOrder,
    toAddPackageOrder,
    toGetCharge,
    toGetDiscount,
    toAddRequire,
    toDelRequire,
}