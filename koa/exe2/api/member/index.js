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
 *我的收藏
 *
 * @param {*} {memberId}
 * @returns
 */
const getFavorite = function ({memberId, headers}){
    return new Promise((resolve, reject)=>{
        if(!memberId && memberId!=0 ){reject('没有用户参数')};

        _req({
            url: '/favorite/getFavoriteList',
            data: {
                memberId,//会员id
            },
            headers,
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
    getMemberInfo,
    getFavorite,
}