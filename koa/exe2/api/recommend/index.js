const { webRoot, curDate } = require('../../assets/js/globalDefine.js');
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
            url: webRoot + '/seachAd',
            data: {
                endDate,
                pageNo,
                isValid
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
 * 获取产品推荐
 *
 * @export
 * @returns
 */
const getProRecom = function ( {pageNo, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名');};

        _req({
            url: webRoot + '/seachSt',
            data: {
                endDate,
                pageNo,
                isValid
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
 * 获取产品推荐详情
 *
 * @export
 * @returns
 */
const getProRecomDetail = function ( {showID, isValid=1, endDate=curDate} ){
    return new Promise((resolve, reject)=>{
        if(!showID){reject('未指定模块id');};

        _req({
            url: webRoot + '/seachStDetail',
            data: {
                endDate,
                showID,
                isValid
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

const axiosAll = function (axiosList){
    return new Promise((resolve, reject)=>{
        _req.all(axiosList)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    getAdvRecom,
    getProRecom,
    getProRecomDetail,
    axiosAll,
}