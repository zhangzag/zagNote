const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;
/**
 * 获取广告推荐
 *
 * @export
 * @returns
 */
// const getAdvRecom = function ( {pageNo, isValid=1} ){
//     return new Promise((resolve, reject)=>{
//         if(!pageNo){reject('未指定模块名');};

//         _req({
//             url: '/seachAd',
//             data: {
//                 endDate: curDate,
//                 pageNo,
//                 isValid
//             },
//         })
//         .then(res=>{
//             resolve(res);
//         })
//         .catch(err=>{
//             reject(err);
//         });
//     });
// };

module.exports = {
    
}