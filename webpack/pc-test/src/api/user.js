import { webRoot } from '@/assets/js/globalDefine.js';
import { _req } from './apiConfig.js';


/**
 *登录
 *
 * @export
 * @param {*} {username, password}
 * @returns
 */
export function login( {username, password} ){
    return new Promise((resolve, reject)=>{
        if( !username || !password ){
            reject('未输入账号或密码');
        }

        _req({
            url: webRoot + '/login',
            data: {
                username,
                password,
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


/**
 *验证图形验证码
 *
 * @export
 * @param {*} {telephone, code}
 * @returns
 */
export function verifyCodeApi( {telephone, code} ) {
    return new Promise((resolve, reject)=>{
        if( !telephone || !code ){
            reject('参数不齐');
        }

        _req({
            url: webRoot + '/verifyCode',
            data: {
                telephone,
                code,
            },
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
    });
}


/**
 *短信验证
 *
 * @export
 * @param {*} {telephone, randomCode}
 * @returns
 */
export function verifyMessageApi( {telephone, randomCode} ) {
    return new Promise((resolve, reject)=>{
        if( !telephone || !randomCode ){
            reject('参数不齐');
        }

        _req({
            url: webRoot + '/verifyMessage',
            data: {
                telephone,
                randomCode,
            }
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
    });
}



/**
 *更换密码
 *
 * @export
 * @param {*} {telephone, randomCode}
 * @returns
 */
export function changePasswordApi( {telephone, randomCodeTwo, password} ) {
    return new Promise((resolve, reject)=>{
        if( !telephone || !randomCodeTwo || !password ){
            reject('参数不齐');
        }

        _req({
            url: webRoot + '/changePassword',
            data: {
                telephone,
                randomCodeTwo,
                password
            }
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        });
    });
}

