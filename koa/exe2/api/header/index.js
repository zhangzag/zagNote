const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');
let _req = _reqs._req;

/**
 * 获取一级分类 - 科室
 *
 * @export
 * @returns
 */
const getCategory = function (){
    return new Promise((resolve, reject)=>{
        _req({
            url: '/productType/getProductTypeList',
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
 *获取热门搜索 - 通过分类id
 *
 * @export
 * @param {*} productTypeID
 * @param {string} [type='']
 * @param {number} [isValid=1]
 */
const getHotSearc = function({productTypeID, type='', isValid=1}){
    return new Promise((resolve, reject)=>{
        _req({
            url:  '/getHotSearchByProductTypeID',
            data: {
                endDate: curDate,//格式为 2018-05-26 00:00:00
                productTypeID,//格式为 int
                type,//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
                isValid,
            },
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
 *获取热门搜索详情
 *
 * @param {*} {searchID, type='', isValid=1}
 * @returns
 */
const getHotSearcDetail = function({searchID, type='', isValid=1}){
    return new Promise((resolve, reject)=>{
        _req({
            url:  '/getHSDetailByParams',
            data: {
                endDate: curDate,//格式为 2018-05-26 00:00:00
                searchID,//
                type,//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
                isValid,
            },
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
    getCategory,
    getHotSearc,
    getHotSearcDetail
}