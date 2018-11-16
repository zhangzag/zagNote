'use strict';

let http = require('http');

//创建http server
let server = http.createServer((request, response)=>{
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log( request.method + ': ' + request.url );
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>http</h1>' + `${request.method} -- ${request.url}`);
});

// 让服务器监听8080端口:
server.listen(3001);
console.log('Server is running at http://127.0.0.1:3001/');

