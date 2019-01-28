const axios = require('axios');
const Qs = require('qs');
const processEnv = process.env;

let curWebRoot = 'http://192.168.2.254:8080/AKGW-api/v1';
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
            // curWebRoot = '/tapi';
            curWebRoot = 'http://192.168.2.254:8080/AKGW-api/v1';
    }
}
let webRoot = curWebRoot;

const _req = axios.create({
    // baseURL: 'http://113.108.163.210:9999/AKGW-api/v1',
    baseURL: webRoot,
    method: 'post',
    timeout: 20000,
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    transformRequest: [function (data) {
        data = Qs.stringify(data)
        return data
    }],
    withCredentials: true,
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 9000,
    //     auth: {
    //       username: 'mikeymike',
    //       password: 'rapunz3l'
    //     }
    // }
    // '/api': { target: 'http://192.168.2.254:8080', pathRewrite: {'^/api': '/AKGW-api/v1'} }
});

_req.all = axios.all;
_req.spread = axios.spread;
_req.axiosAll = (axiosList) =>{
    return new Promise((resolve, reject)=>{
        _req.all(axiosList)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    _req: _req
};
