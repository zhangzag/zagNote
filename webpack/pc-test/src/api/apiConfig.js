import { webRoot } from '@/assets/js/globalDefine.js';
import sha256 from 'sha-256-js';
import Cookies from 'js-cookie';

// console.log(1233, Cookies.get('memberId'))
let setAuthorization = Cookies.get('memberId')?sha256(JSON.parse(Cookies.get('memberId')) + 'akjk') : '';

$.ajaxSetup( {
    url: webRoot , // 默认URL
    type: "POST" , // 默认使用POST方式
    dataType: 'json',//默认格式
    cache: true,
    headers : {
        'Authorization': setAuthorization,
    },
    error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
        // errorMsg 可能为： "Not Found"、"Internal Server Error"等

        // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
        //console.log('账号登陆错误错误啊需要返回从新登陆')
        //console.log(jqXHR)
        if (jqXHR.status==500) {
            console.log( '出错[' + jqXHR.status + ']：' + errorMsg+':::'+jqXHR.responseText ); 

            if( JSON.parse(jqXHR.responseText).msg === '请先登录！' ){
                alert('请等登录')
                // $('body').append('<div class="loginLayer"></div>')
                console.log('请先登录！')
            }
        }
        if (jqXHR.status==404) {
            console.log( '出错[' + jqXHR.status + ']：' + errorMsg+':::'+jqXHR.responseText );  
        }
    }
} );

export function _req( {url, type="POST", dataType='json', cache=true, headers, data, xhrFields='', crossDomain=false} ){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url,
            type,
            dataType,
            cache,
            headers,
            data,
            xhrFields,
            crossDomain
        })
        .success(res=>{
            resolve(res);
        })
        .error(err=>{
            reject(err);
        });
    });
};