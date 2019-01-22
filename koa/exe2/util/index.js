
const CryptoJS = require("crypto-js");
//秘钥必须为：8/16/32位
const aseKey = "zayjt2019";


/***** 模板工具 *****/
const moduleFuns = require('./templateFuns');
/***** 模板工具 end *****/

/***** 过滤 *****/

/***** 过滤 end *****/


/***** 通用方法 *****/

//设置加密cookie
const setCookieByKey = (ctx, data)=>{
    if(!data && data!=0){return}
    
    let stringData = String(data);
    // 加密
    let encrypt = CryptoJS.DES.encrypt(stringData, aseKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    // return encrypt;
    ctx.cookies.set('_sami', encrypt, {
        // maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        // domain: 'localhost',  // 写cookie所在的域名
        // path: '/index',       // 写cookie所在的路径
        maxAge: 60*60*24*1000, // cookie有效时长
        // expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    })
}

//解密cookie
const getCookieByKey = (ctx, name)=>{
    if(!name && name!=0){return}
    
    let stringData = ctx.cookies.get(name) || '';
    if(!stringData){return}
    // 加密
    // let decrypt = CryptoJS.DES.decrypt(stringData, aseKey, {
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    // }).toString(CryptoJS.enc.Utf8);
    let decrypt = CryptoJS.DES.decrypt(stringData, aseKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
    
    return decrypt
}

//清除cookie
const removeCookie = (ctx, name)=>{
    if(!name && name!=0){return false;}

    // return encrypt;
    ctx.cookies.set(name, '', {
        // maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        // domain: 'localhost',  // 写cookie所在的域名
        // path: '/index',       // 写cookie所在的路径
        maxAge: 0, // cookie有效时长
        // expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    })
    return true;
}
/***** 通用方法 end *****/

module.exports = {
    moduleFuns,
    setCookieByKey,
    getCookieByKey,
    removeCookie,
}