
import Cookie from 'js-cookie'

//获取服务端cookie
export const getcookiesInServer = function (req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
};
//获取客户端cookie
export const getcookiesInClient = function (key) {
  return Cookie.get(key) ? Cookie.get(key) : '';
};
//时间格式化
export const curDate = dataFormat();
function dataFormat(type){
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

  return new Date().Format( type || "yyyy-MM-dd hh:mm:ss");
};

/* 验证函数 */
//手机验证
export const verifyPhone = function(data){
  const check = /^1[3|4|5|6|7|8|9][0-9]{9}$/;

  return check.test(data);
};
//1-10位由中文、英文、数组组成的姓名
export const verifyName = function(data){
  const check = /^([\u4E00-\u9FA5A-Za-z0-9]{1,10})$/;

  return check.test(data);
};
//身份证
export const verifyIdCard = function(data){
  const check = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

  return check.test(data);
};
//密码 (请输入6~20个英文字母、数字或符号（除空格）)
export const verifyPwd = function(){
  const check = /^[0-9A-Za-z!#$%^&*]{6,20}$/;

  return check.test(data);
};
