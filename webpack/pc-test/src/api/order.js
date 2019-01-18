import { webRoot } from '@/assets/js/globalDefine.js';
import { _req } from './apiConfig.js';

/**
 * 获取订单统计
 *
 * @export
 * @returns
 */
export function getOrderCount ({ memberId }){
    return new Promise((resolve, reject)=>{
        if( !memberId ){
            reject('没有会员id');
        }

        _req({
            url: webRoot + '/order/getOrderCount',
            data: {
                memberId
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