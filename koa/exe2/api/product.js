import { webRoot, curDate } from '@/assets/js/globalDefine.js';
import { _req } from './apiConfig.js';

export function getProByProductNumber( {memberId, productNumbers} ) {
    return new Promise((resolve, reject)=>{
        if(!productNumbers){reject('未指定商品id');};

        _req({
            url: webRoot + '/product/getProductByProductNumber',
            data: JSON.stringify({
                memberId,
                productNumbers,
            }),
            headers: {'Content-Type' : 'application/json;charset=utf-8'}
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
    });
}