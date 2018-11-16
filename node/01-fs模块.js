'use strict';

var fs = require('fs');

//读取文本文件
// fs.readFile('tt.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

//读取二进制文件
// fs.readFile('icon.png', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//         console.log(data.length + ' bytes');

//         // Buffer -> String
//         let text = data.toString('utf-8');
//         console.log(text);

//         // String -> Buffer
//         let buf = Buffer.from(text, 'utf-8');
//         console.log(buf);
//     }
// });


//写入文件
// let data = 'Hello, Node.js';
// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//     }
// });


//获取文件的创建信息
// fs.stat('sample.txt', function (err, stat) {
//     if (err) {
//         console.log(err);
//     } else {
//         // 是否是文件:
//         console.log('isFile: ' + stat.isFile());
//         // 是否是目录:
//         console.log('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             // 文件大小:
//             console.log('size: ' + stat.size);
//             // 创建时间, Date对象:
//             console.log('birth time: ' + stat.birthtime);
//             // 修改时间, Date对象:
//             console.log('modified time: ' + stat.mtime);
//         }
//     }
// });
