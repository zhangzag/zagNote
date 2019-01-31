var UglifyJS = require("uglify-js");
var fs = require('fs')
var path = require('path')
var CleanCSS = require('clean-css');

var options = {
    warnings: false,
    compress: {
        // compress options
    },
    nameCache: null, // or specify a name cache object
    ie8: true,
}

//清空
async function delDir(path){
    console.log('清空 dist 文件夹...')
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
async function go (){
    await delDir(path.join(__dirname, '/dist'))//调用文件遍历方法
}
go();

//css
let styleFilePath = path.resolve('./assets/style');
fileHandle(styleFilePath, '/dist/style');
//plug
let plugFilePath = path.resolve('./assets/plug');
fileHandle(plugFilePath, '/dist/plug');
//images
let imgFilePath = path.resolve('./assets/images');
fileHandle(imgFilePath, '/dist/images');

//文件遍历方法
function fileHandle(filePath, dirName){
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
                if(!fs.existsSync(path.join(__dirname, dirName))){
                    fs.mkdir(path.join(__dirname, dirName),function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                        console.log(`创建 ${dirName} 目录成功`);
                    })
                }
            }else{
                console.log('dist 目录已存在');
                let paths = path.join(__dirname, dirName);
                // console.log('paths: ', paths)
                if( !fs.existsSync(paths) ){
                    fs.mkdir(path.join(__dirname, dirName),function(error){
                        if(error){
                            console.log('出错了,', error);
                            return false;
                        }
                        console.log(`创建 ${dirName} 目录成功`);
                    })
                }
            }
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                let filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            let fileExtname = path.extname(filedir);
                            // 读取文件内容
                            let curFile = fs.readFileSync(filedir);

                            if( dirName == '/dist/plug' ){
                                //插件目录下文件不压缩
                                fs.writeFileSync(filedir.replace(/assets/, "dist"), curFile, "utf8");
                            }else{
                                if( fileExtname == '.css' ){
                                    //cssy压缩
                                    console.log(`压缩 ${filedir}`)
                                    let output = new CleanCSS({compatibility: 'ie9'}).minify(curFile.toString());
                                    
                                    fs.writeFileSync(filedir.replace(/assets/, "dist"), output.styles, "utf8");
                                }else{
                                    console.log(`移动文件 ${filedir}`)
                                    fs.writeFileSync(filedir.replace(/assets/, "dist"), curFile, "utf8");
                                }
                            }
                        }
                        if(isDir){
                            let prePath = path.resolve(filedir, '..');
                            
                            if( !fs.existsSync(path.resolve(prePath.replace(/assets/, "dist"), filename)) ){
                                fs.mkdir(path.resolve(prePath.replace(/assets/, "dist"), filename),function(error){
                                    if(error){
                                        console.log(error);
                                        return false;
                                    }
                                    console.log(`创建 ${filename} 目录成功`);
                                })
                            }
                            
                            fileHandle(filedir, dirName);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

//压缩处理js文件
let jsFilePath = path.resolve('./assets/js');
//调用文件遍历方法
fileCompress(jsFilePath);
//文件遍历方法
function fileCompress(filePath){
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
                if(!fs.existsSync(path.join(__dirname, '/dist/js'))){
                    fs.mkdir(path.join(__dirname, '/dist/js'),function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                        console.log('创建 dist/js 目录成功');
                    })
                }
            }else{
                console.log('dist 目录已存在');
                if(!fs.existsSync(path.join(__dirname, '/dist/js'))){
                    fs.mkdir(path.join(__dirname, '/dist/js'),function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                        console.log('创建 dist/js 目录成功');
                    })
                }
            }
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                console.log('filename: ', filename)
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
                            console.log(`压缩 ${filedir}`)
                            fs.writeFileSync(filedir.replace(/assets/, "dist"), UglifyJS.minify({
                                filename: fs.readFileSync(filedir, 'utf-8'),
                            }, options).code, "utf8");
                        }
                        if(isDir){
                            let prePath = path.resolve(filedir, '..');

                            // console.log('isDir文件: ', prePath)
                            if( !fs.existsSync(path.resolve(prePath.replace(/assets/, "dist"), filename)) ){
                                fs.mkdir(path.resolve(prePath.replace(/assets/, "dist"), filename),function(error){
                                    if(error){
                                        console.log(error);
                                        return false;
                                    }
                                    console.log(`创建 ${filename} 目录成功`);
                                })
                            }
                        
                            fileCompress(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
