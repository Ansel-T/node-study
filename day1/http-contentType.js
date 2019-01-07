//node 中没有全局作用域 只有模块作用域 每个文件就是一个模块
//

//1.引入http 模块
const http = require('http');

//2.create

let server = http.createServer();

//3.
server.on('request',function (req,res) {
    console.log('收到请求');
    let url = req.url;
    if(url === "/plain"){
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('hello 世界')
    } else if (url === "/html"){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end('<p>hello html! <a href="#">aa-link</a></p> ');
    }else{
        res.end('404')
    }
})

//4.
server.listen('3000',function () {
    console.log('开启服务')
})

