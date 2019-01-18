const { webRoot, curDate } = require('../../assets/js/globalDefine.js');
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
            url: webRoot + '/productType/getProductTypeList',
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
 * @param {*} productTypeId
 * @param {string} [type='']
 * @param {number} [isValid=1]
 */
const getHotSearc = function( productTypeId='', type='', isValid=1 ){
    return new Promise((resolve, reject)=>{
        _req({
            url:  webRoot + '/getHotSearchByProductTypeID',
            data: {
                endDate: curDate,//格式为 2018-05-26 00:00:00
                productTypeID: productTypeId,//格式为 int
                type: type,//格式为 int   1、分类 2、商品 3、品牌   可为空，为空时返回3种类型的热门搜索
                isValid: isValid,
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
    getHotSearc
}