const { curDate } = require('../../util/');
const _reqs = require('../apiConfig.js');

let _req = _reqs._req;
/**
 * 登录
 *
 * @export
 * @returns
 */
const loginMember = function ( {username, password} ){
    return new Promise((resolve, reject)=>{
        if(!username ){reject('请输入用户名')};
        if(!password ){reject('请输入密码')};

        _req({
            // url: '/login',
            url: '/login',
            data: {
                username,//用户名
                password,//用户密码
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
};

/**
 *获取短信验证码
 *
 * @param {*} {telephone, code}
 * @returns
 */
const sendCodeMsg = function ({telephone, code}){
    // /sendCodeMessage
    return new Promise((resolve, reject)=>{
        if(!telephone ){reject('请输入手机号码')};
        if(!code ){reject('请输入图形验证码')};

        _req({
            url: '/sendCodeMessage',
            data: {
                telephone,
                code,
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *会员注册
 *
 * @param {*} {telephone, randomCodeTwo, password, code}
 * @returns
 */
const vipRegister = function ({telephone, randomCodeTwo, password, code}){
    return new Promise((resolve, reject)=>{
        if(!telephone ){reject('请输入手机号码')};
        if(!code ){reject('请输入图形验证码')};
        if(!randomCodeTwo ){reject('请输入短信验证码')};
        if(!password ){reject('请输入密码')};

        _req({
            url: '/sendCodeMessage',
            data: {
                telephone, //电话号码
                randomCodeTwo, //验证码
                password,//密码
                code
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *验证图形验证码
 *
 * @param {*} {telephone, code}
 * @returns
 */
const verifyMapCode = function ({telephone, code}){
    return new Promise((resolve, reject)=>{
        if(!telephone ){reject('请输入手机号码')};
        if(!code ){reject('请输入图形验证码')};

        _req({
            url: '/verifyCode',
            data: {
                telephone, //电话号码
                code
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *验证短信验证码
 *
 * @param {*} {telephone, randomCode}
 * @returns
 */
const verifyMsgCode = function ({telephone, randomCode}){
    return new Promise((resolve, reject)=>{
        if(!telephone ){reject('请输入手机号码')};
        if(!randomCode ){reject('请输入短信验证码')};

        _req({
            url: '/verifyMessage',
            data: {
                telephone, //电话号码
                randomCode
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

/**
 *更换密码
 *
 * @param {*} {telephone, randomCodeTwo, password}
 * @returns
 */
const changeNewPwd = function ({telephone, randomCodeTwo, password}){
    return new Promise((resolve, reject)=>{
        if(!telephone ){reject('请输入手机号码')};
        if(!randomCodeTwo ){reject('请输入短信验证码')};
        if(!password ){reject('请输入新密码')};

        _req({
            // url: '/verifyMessage',
            url: '/changePassword',
            data: {
                telephone, //电话号码
                randomCodeTwo,
                password
            },
        }).then(res=>{resolve(res);}).catch(err=>{reject(err);});
    });
}

module.exports = {
    loginMember,
    sendCodeMsg,
    vipRegister,
    verifyMapCode,
    verifyMsgCode,
    changeNewPwd,
}