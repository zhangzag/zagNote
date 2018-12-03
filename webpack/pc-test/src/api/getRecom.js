import { webRoot, curDate } from '@/assets/js/globalDefine.js';
import { _req } from './apiConfig.js';

/**
 * 获取广告推荐
 *
 * @export
 * @returns
 */
export function getAdvRecom ( {pageNo, isValid=1} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名');};

        _req({
            url: webRoot + '/seachAd',
            data: {
                endDate: curDate,
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
export function getProRecom ( {pageNo, isValid=1} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定模块名');};

        _req({
            url: webRoot + '/seachSt',
            data: {
                endDate: curDate,
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
 * 获取产品推荐 - 推荐详细
 *
 * @export
 * @returns
 */
export function getProRecomDetail ( {showID, isValid=1} ){
    return new Promise((resolve, reject)=>{
        if(!showID){reject('未指定推荐模块id');};

        _req({
            url: webRoot + '/seachStDetail',
            data: {
                endDate: curDate,
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


/**
 *获取品牌推荐
 *
 * @export
 * @param {*} {pageNo, isValid=1}
 * @returns
 */
export function getBrandRecom( {pageNo, isValid=1} ){
    return new Promise((resolve, reject)=>{
        if(!pageNo){reject('未指定推荐模块名称');};

        _req({
            url: webRoot + '/searchShowBrand',
            data: {
                endDate: curDate,
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
}

//获取品牌推荐详情
export function getBrandRecomDetail( {showBrandID, isValid=1} ){
    return new Promise((resolve, reject)=>{
        if( !showBrandID && showBrandID!=0 ){ reject('没有指定模块id'); }

        _req({
            url: webRoot + '/searchShowBrandDetail',
            data: {
                endDate: curDate,
                showBrandID,
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