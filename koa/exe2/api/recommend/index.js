const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;
/**
 * 获取广告推荐
 *
 * @export
 * @returns
 */
const getAdvRecom = function ( {pageNo, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名');};

        _req({
            url: '/seachAd',
            data: {
                endDate,
                pageNo,
                isValid
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 * 获取产品推荐
 *
 * @export
 * @returns
 */
const getProRecom = function ( {pageNo, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名');};

        _req({
            url: '/seachSt',
            data: {
                endDate,
                pageNo,
                isValid
            },
        }).then(res=>{resolve(res);})
        .catch(err=>{reject(err);});
    });
};

/**
 * 获取产品推荐详情
 *
 * @export
 * @returns
 */
const getProRecomDetail = function ( {showID, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!showID){reject('未指定模块id');};

        _req({
            url: '/seachStDetail',
            data: {
                endDate,
                showID,
                isValid
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *获取楼层品牌推荐
 *
 * @param {*} {pageNo, isValid=1, endDate=curDate}
 * @returns
 */
const getRecomBrand = function ({pageNo, isValid=1, endDate=curDate}){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名称');};

        _req({
            url: '/searchShowBrand',
            data: {
                endDate,//格式为 2018-05-26 00:00:00
                pageNo,
                isValid
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 * 获取每层楼品牌列
 *
 * @export
 * @returns
 */
const getBrandRecomDetail = function ( {showBrandID, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!showBrandID){reject('未指定模块id');};

        _req({
            url: '/searchShowBrandDetail',
            data: {
                endDate,
                showBrandID,
                isValid,
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

module.exports = {
    getAdvRecom,
    getProRecom,
    getProRecomDetail,
    getRecomBrand,
    getBrandRecomDetail,
}