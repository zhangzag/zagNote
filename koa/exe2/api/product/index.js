const { webRoot, curDate } = require('../../assets/js/globalDefine.js');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;
/**
 * 更加id数组获取产品
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


module.exports = {
    getPros,
}