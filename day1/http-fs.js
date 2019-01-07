const http = require('http');
const fs = require('fs');

//1.创建
const server = http.createServer();
server.on('request',function (req,res) {
    let url = req.url;
    console.log(url);
    if(url === "/" || url === "/index.html"){
        fs.readFile('./resource/index.html',function (err,data) {
            if(err){
                res.setHeader('Content-Type','text/plain; charset=utf-8');
                res.end('读取文件失败' + err)
            }else{
                res.setHeader('Content-Type','text/html; charset=utf-8');
                res.end(data)
            }
        })
    } else if(url === '/logo' || url === '/logo.png'){
        fs.readFile('./resource/logo.png',function (err,data) {
            if(err){
                res.setHeader('Content-Type','text/plain; charset=utf-8');
                res.end('读取文件失败' + err)
            }else{
                //res.end() 支持两种数据类型 一种是二进制 一种是字符串
                //编码一般指：字符编码
                res.setHeader('Content-Type','image/png');
                res.end(data)
            }
        })
    } else{
        res.end('404 Not Found')
    }
})

server.listen('3000',function (param) {
    console.log('启动服务，可以通过http://127.0.0.1:3000 来访问')
})