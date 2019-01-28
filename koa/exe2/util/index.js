
const CryptoJS = require("crypto-js");
//秘钥必须为：8/16/32位
const aseKey = "zayjt2019";

//时间格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    
}


/***** 模板工具 *****/
const moduleFuns = require('./templateFuns');
/***** 模板工具 end *****/

/***** 过滤 *****/

/***** 过滤 end *****/


/***** 通用变量 *****/
//当前时间
const curDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
//当前日期
const curDay = new Date().Format("yyyy-MM-dd");

/***** 通用变量 end *****/


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
    curDate,
    curDay
}