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
    loginMember,
}