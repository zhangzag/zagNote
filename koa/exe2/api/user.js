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
 *获取会员信息
 *
 * @export
 * @param {*} { id, headers }
 * @returns
 */
export function getVipInfo({ id }){
    return new Promise((resolve, reject)=>{
        if( !id ){
            reject('没有会员id');
        }

        _req({
            url: webRoot + '/vipSearchByID',
            data: {
                id,
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
 *更新会员信息
 *
 * @export
 * @param {*} { id, headers }
 * @returns
 */
export function updateMemberInfo({ memberID, memberName, sex, birthday }){
    return new Promise((resolve, reject)=>{
        if( !memberID && !memberName && !sex && !birthday ){
            reject('未填会员信息');
        }

        _req({
            url: webRoot + '/updateByMemberId',
            data: {
				memberID,//会员id
				memberName,//会员名称,
				sex,//性别
				birthday,//出生年月日
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

/**
 *注册-短信验证
 *
 * @export
 * @param {*} {telephone, randomCode}
 * @returns
 */
export function sendCodeMessageApi ({ telephone, code }){
    return new Promise((resolve, reject)=>{
        if( !telephone || !code ){
            reject('参数不齐');
        }

        _req({
            url: webRoot + '/sendCodeMessage',
            data:{
                telephone,//电话号码
                code,//图形验证码
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
 *注册-提交
 *
 * @export
 * @param {*} {telephone, randomCode}
 * @returns
 */
export function registerApi({ telephone, randomCodeTwo, password, code }){
    return new Promise((resolve, reject)=>{
        if( !telephone || !randomCodeTwo || !password || !code ){
            reject('参数不齐');
        }

        _req({
            url: webRoot + '/vipRegisterInsert',
            data:{
                telephone, //电话号码
                randomCodeTwo, //验证码
                password,//密码
                code
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
 *获取我的收藏
 *
 * @export
 * @param {memberId} {  }
 */
export function getFavorite({ memberId }){
    return new Promise((resolve, reject)=>{
        if( !memberId ){
            reject('没有会员id');
        }

        _req({
            url: webRoot + '/favorite/getFavoriteList',
            data:{
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
}

/**
 *我的需求记录
 *
 * @export
 * @param {memberId} {  }
 */
export function getRequire({ memberId }){
    return new Promise((resolve, reject)=>{
        if( !memberId ){
            reject('没有会员id');
        }

        _req({
            url: webRoot + '/require/getRequire',
            data:{
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
}

/**
 *我的处方笺记录
 *
 * @export
 * @param {memberId} {  }
 */
export function getPrescription({ memberId }){
    return new Promise((resolve, reject)=>{
        if( !memberId ){
            reject('没有会员id');
        }

        _req({
            url: webRoot + '/prescription/getPrescription',
            data:{
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
}