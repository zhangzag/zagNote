const { webRoot, curDate } = require('../../assets/js/globalDefine.js');
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
            url: webRoot + '/product/getProductByProductNumber',
            data: JSON.stringify({
                memberId,
                productNumbers,
            }),
            headers: {'Content-Type' : 'application/json;charset=utf-8'},
            transformRequest: [function (data) {
                return data
            }]
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
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
            url: webRoot + '/product/getProductList',
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
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
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
            url: webRoot + '/brand/getBrandList',
            data: {
                page,
                limit,
            }
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
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
            url: webRoot + '/product/searchALLDisease',
            data: {
                page,
                limit,
            }
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
    });
};

module.exports = {
    getPros,
    getProList,
    getBrandList,
    getALLDisease,
}