import Cookies from 'js-cookie';
const processEnv = process.env;

//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz 
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

//webRoot
let curWebRoot = '/tapi';
if( processEnv && processEnv.NODE_ENV ){
    switch( processEnv.NODE_ENV )
    {
        case 'development': //开发
            curWebRoot = 'http://192.168.2.254:8080/AKGW-api/v1';
            break;
        case 'production': //生产
            curWebRoot = 'http://113.108.163.210:9999/AKGW-api/v1'; 
            break;
        case 'preview': //预览
            curWebRoot = 'http://113.108.163.210:9999/AKGW-api/v1'; 
            break;
        case 'testing'://测试
            curWebRoot = 'http://192.168.2.254:8080/AKGW-api/v1';
            break;
        default: //默认
            curWebRoot = '/tapi';
    }
}

export let webRoot = curWebRoot;
// export let webRoot = 'http://192.168.2.254:8080/AKGW-api/v1';

//当前时间
export let curDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
//当前日期
export let curDay = new Date().Format("yyyy-MM-dd");

//会员id
export let memberId = Cookies.get('memberId')?JSON.parse(Cookies.get('memberId')) : '';

//会员信息
export let memberInfo = Cookies.get('_mi')?JSON.parse(Cookies.get('_mi')) : '';


