const axios = require('axios');
const Qs = require('qs');

const _req = axios.create({
    baseURL: 'http://113.108.163.210:9999/AKGW-api/v1',
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
    //     auth: : {
    //       username: 'mikeymike',
    //       password: 'rapunz3l'
    //     }
    //  	},
    // '/api/': { target: 'http://192.168.2.254:8080/AKGW-api/v1', pathRewrite: {'^/api/': ''} }
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
