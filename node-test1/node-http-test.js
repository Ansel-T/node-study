'use strict'
//1.导入http模块
//E:\产品站 code\cloud
const http  = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path');

//从命令行参数获取root目录，默认是当前目录
let root = path.resolve(process.argv[2] || '.');
console.log(root);

//2.创建http server 并传入回调函数
let server = http.createServer(function(request,response){
    //获取url 的path
    let pathName = url.parse(request.url).pathname;
    //获得对应的本地文件路径
    let filePath =  path.join(root,pathName);
    //读取文件
    fs.stat(filePath,function (err,stat) {
        if(!err && stat.isFile()){
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        } else if(!err && stat.isDirectory()) {
            fs.readdir(filePath,'utf-8',function (err,files) {
                if(err) {
                    console.log(err);
                    return;
                }
                for (let file of files){
                    if(file === 'index.html' || file === 'default.html'){
                        response.writeHead(200);
                        fs.createReadStream(path.join(filePath,file)).pipe(response);
                    }
                }

            })
        }else{
            //出错 或者文件不存在
            console.log('404' + request.url);
            response.writeHead(404);
            response.end('404 Not found');
        }
    })
});

//3.让服务器监听8070端口
server.listen(8070);
console.log('Server is running at http://127.0.0.1:8070/')