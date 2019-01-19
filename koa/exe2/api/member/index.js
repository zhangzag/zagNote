const { webRoot, curDate } = require('../../assets/js/globalDefine.js');
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
            url: webRoot + '/vipSearchByID',
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


module.exports = {
    getMemberInfo,
}