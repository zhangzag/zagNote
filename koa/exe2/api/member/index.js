const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;
/**
 * 登录
 *
 * @export
 * @returns
 */
const getMemberInfo = function ( {id, headers} ){
    return new Promise((resolve, reject)=>{
        if(!id && id!=0 ){reject('没有用户id参数')};

        _req({
            url: '/vipSearchByID',
            data: {
                id,//会员id
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *我的收藏
 *
 * @param {*} {memberId, page=1, limit=10, headers}
 * @returns
 */
const getFavorite = function ({memberId, page=1, limit=10, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/favorite/getFavoriteList',
            data: {
                memberId,//会员id
                page,
                limit
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *取消我的收藏
 *
 * @param {*} {memberId}
 * @returns
 */
const cancelFavorite = function ({memberId, productId, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/favorite/delFavoriteBymemberIdAndProId',
            data: {
                memberId,//会员id
                productId,
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *取消我的收藏 - 多选
 *
 * @param {*} {memberId, datas}
 * @returns
 */
const cancelFavoriteByArr = function ({datas, headers}){
    return new Promise((resolve, reject)=>{
        // if(!memberId && memberId!=0 ){reject('没有用户参数')};
        _req({
            url: '/favorite/delFavorite',
            data: datas,
            headers,
            transformRequest: [function (data) {
                return data
            }],
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *获取我的需求记录
 *
 * @param {*} {memberId, headers}
 * @returns
 */
const getMyRequire = function({memberId, page=1, limit=10, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/require/getRequire',
            data: {
                memberId,//会员id
                page,
                limit
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取我的处方笺记录
 *
 * @param {*} {memberId, headers}
 * @returns
 */
const getMyPrescript = function({memberId, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/prescription/getPrescription',
            data: {
                memberId,//会员id
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取我的订单状态
 * 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
 * @param {*} {memberId, headers}
 * @returns
 */
const getMyOrderCount = function({memberId, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/order/getOrderCount',
            data: {
                memberId,//会员id
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取我的订单
 *
 * @param {*} {memberId, page=1, limit=20, recentDate, orderCodeOrProName, headers}
 * @returns
 */
const getMyOrder = function({memberId, page=1, limit=20, recentDate, orderCodeOrProName, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/order/getOrderByMemberId',
            data: {
                memberId,//会员id
                page, 
                limit, 
                recentDate, 
                orderCodeOrProName
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *根据订单状态获取我的订单
 *
 * @param {*} {datas, headers}
 * @returns
 */
const getMyOrderByStatus = function({datas, headers}){
    return new Promise((resolve, reject)=>{
        // if(!memberId && memberId!=0 ){reject('没有用户参数')};
        _req({
            url: '/order/getOrderByMemberIdAndStatus',
            data: datas,
            headers,
            transformRequest: [function (data) {
                return data
            }],
        }).then(res=>{resolve(res);}).catch(err=>{
            reject(err);});
    });
}

/**
 *查看订单详情
 *
 * @param {*} {datas, headers}
 * @returns
 */
const getOrderDetail = function({orderID, headers}){
    return new Promise((resolve, reject)=>{
        if(!orderID && orderID!=0 ){reject('没有订单参数')};
        _req({
            url: '/order/getOrderInfoByOrderId',
            data: {
                orderID
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{
            reject(err);});
    });
}

/**
 *取消订单
 *
 * @param {*} {orderId, headers}
 * @returns
 */
const cancelOrder = function({orderId, headers}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/order/updateOrderStatusByCancel',
            data: {
                orderId
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *确认订单收货
 *
 * @param {*} {orderId, headers}
 * @returns
 */
const comfireGetOrder = function({orderId, headers}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/order/updateOrderStatusByConfirmReceipt',
            data: {
                orderId
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *查看物流
 *
 * @param {*} {logisticsNo, logisticsCode, headers}
 * @returns
 */
const getDeliveryInfo = function({logisticsNo, logisticsCode, headers}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/delivery/getLogistics',
            data: {
                logisticsNo,
                logisticsCode
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取收货地址
 *
 * @param {*} {memberId, headers}
 * @returns
 */
const getAddress = function({memberId, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};
        _req({
            url: '/delivery/getDeliveryAddress',
            post: 'get',
            data: {
                memberId
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取省市区
 *
 * @param {*} {parentId}
 * @returns
 */
const getSelectArea = function({parentId}){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/selectArea',
            data: {
                parentId
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *增加收货地址
 *
 * @param {*} {memberID, isDefault=0, countryID=1, districtID, city, county, address, mobile, telephone, phone, contactMan, addressID}
 * @returns
 */
const addDelivery = function({memberID, isDefault=0, countryID=1, districtID, city, county, address, mobile, telephone, phone, contactMan, addressID, headers}){
    console.log('pppp:  ', memberID, isDefault, countryID, districtID, city, county, address, mobile, telephone, phone, contactMan, addressID, headers)
    return new Promise((resolve, reject)=>{
        if(!memberID && memberID!=0 ){reject('没有用户参数')};
        _req({
            url: '/delivery/addDeliveryAddress',
            data: {
                memberID,
                isDefault,//是否默认地址
                countryID,//国家编码, 默认中国 1
                districtID,//省、直辖市
                city,//市县
                county,//区、县
                address,//街道地址
                mobile,//移动电话
                telephone,//固定电话
                phone,
                contactMan,//联系人
                addressID,//编辑地址ID 不是编辑时不传
            },
            headers
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *通过会员获取收货地址
 *
 * @param {*} {memberId, headers}
 * @returns
 */
const toGetDeliveryAddress = function({memberID, addressID, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberID && memberID!=0 ){reject('没有用户参数')};

        _req({
            url: '/delivery/getDeliveryAddressByMemberID',
            post: 'get',
            data: {
                memberID,
                addressID
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *删除收货地址
 *
 * @param {*} {memberId, addressID, headers}
 * @returns
 */
const toDelDeliveryAddress = function({memberID, addressID, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberID && memberID!=0 ){reject('没有用户参数')};

        _req({
            url: '/delivery/delDeliveryAddress',
            data: {
                memberID,
                addressID
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *设置收货地址是否为默认
 *
 * @param {*} {memberId, addressID, headers}
 * @returns
 */
const setDefaultAddress = function({memberID, addressID, isDefault, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberID && memberID!=0 ){reject('没有用户参数')};
        if(!addressID && addressID!=0 ){reject('没有地址参数')};

        _req({
            url: '/delivery/isDefualt',
            data: {
                memberID,
                addressID,
                isDefault,
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *添加处方笺
 *
 * @param {*} params
 * @returns
 */
const toAddPrescript = function (params){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/prescription/addPrescription',
            data: params,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取处方笺列表
 *
 * @param {*} {memberId, addressID, headers}
 * @returns
 */
const toGetPrescript = function({memberId, page=1, limit=10, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/prescription/getPrescription',
            data: {
                memberId,
                page,
                limit,
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *获取处方笺详情
 *
 * @param {*} {prescriptionId}
 * @returns
 */
const toGetPrescriptDetail = function({prescriptionId}){
    return new Promise((resolve, reject)=>{
        if(!prescriptionId && prescriptionId!=0 ){reject('没有处方笺id参数')};

        _req({
            url: '/prescription/getPrescriptionById',
            data: {
                prescriptionId
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *更新会员信息
 *
 * @returns
 */
const updateMemberInfo = function({memberID, memberName, sex, birthday, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberID && memberID!=0){reject('没有会员参数')}
        
        _req({
            url: '/updateByMemberId',
			data: {
				memberID,//会员id
				memberName,//会员名称,
				sex,//性别
				birthday,//出生年月日
                // file: '', //头像
            },
            headers,
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *更新头像
 *
 * @param {*} params
 */
// const toUpdateImg = function ({form, headers}){
//     return new Promise((resolve, reject)=>{
//         _req({
//             url: '/upLoadByMemberId',
// 			data: form,
//             headers,
//             transformRequest: [function (data) {
//               return data
//             }],
//         }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
//     });
// }

module.exports = {
    getMemberInfo,
    getFavorite,
    cancelFavorite,
    cancelFavoriteByArr,
    getMyRequire,
    getMyPrescript,
    getMyOrderCount,
    getMyOrder,
    getMyOrderByStatus,
    cancelOrder,
    comfireGetOrder,
    getDeliveryInfo,
    getOrderDetail,
    getAddress,
    getSelectArea,
    addDelivery,
    toGetDeliveryAddress,
    toDelDeliveryAddress,
    setDefaultAddress,
    toGetPrescript,
    toGetPrescriptDetail,
    updateMemberInfo,
    toAddPrescript,
    // toUpdateImg,
}