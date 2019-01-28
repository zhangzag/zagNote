var UglifyJS = require("uglify-js");
var fs = require('fs')
var path = require('path')

var options = {
    warnings: false,
    parse: {
        // parse options
    },
    compress: {
        // compress options
    },
    mangle: {
        // mangle options
        toplevel: true,
        properties: {
            // mangle property options
        }
    },
    output: {
        // output options
    },
    sourceMap: {
        // source map options
    },
    nameCache: null, // or specify a name cache object
    toplevel: true,
    ie8: true,
}

var filePath = path.resolve('./test');

//清空
function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
delDir(path.join(__dirname, '/dist'))

//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            if( !fs.existsSync(path.join(__dirname, '/dist')) ){
                fs.mkdir(path.join(__dirname, '/dist'),function(error){
                    if(error){
                        console.log(error);
                        return false;
                    }
                    console.log('创建 dist 目录成功');
                })
            }
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            // console.log('文件的路径： ', filedir);
                            // 读取文件内容
                            // console.log('文件路径转换： ', filedir.replace(/test/, "dist"));
                            fs.writeFileSync(filedir.replace(/test/, "dist"), UglifyJS.minify({
                                filename: fs.readFileSync(filedir, 'utf-8'),
                            }, options).code, "utf8");
                        }
                        if(isDir){
                            let prePath = path.resolve(filedir, '..');

                            fs.mkdir(path.resolve(prePath.replace(/test/, "dist"), filename),function(error){
                                if(error){
                                    console.log(error);
                                    return false;
                                }
                                console.log(`创建 ${filename} 目录成功`);
                            })
                        
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
