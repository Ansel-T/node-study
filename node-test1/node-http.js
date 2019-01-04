'use strict'
//1.导入http模块
//E:\产品站 code\cloud
const http  = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path');
//2.创建http server 并传入回调函数
let server = http.createServer(function(request,response){
    //打印http请求的method和url
    console.log(request.method + ':' +request.url);
    //设置http响应wei200,并设置Content-Type
    response.writeHead(200,{'Content-Type':'text/html'});
    //将http 响应的内容写入response
    response.end('<h1>Hello world !</h1>')
});

//3.让服务器监听8070端口
server.listen(8070);
console.log('Server is running at http://127.0.0.1:8070/')