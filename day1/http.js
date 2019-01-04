const http = require('http');

//1.创建
const server = http.createServer();

server.on('request',function (request,response) {
    console.log('收到请求，url---->' + request.url)

    switch(request.url){
        case '/' || '/index':
            response.write('index')
            break;
        case "/login":
            response.write('login');
            break;
        case '/reg':
            response.write('register');
            break;
        default:
            response.write('index');
    }
    // response.write('hello ')
    // response.write(' node !')
    response.end();
})

server.listen('3000',function (param) {
    console.log('启动服务，可以通过http://127.0.0.1:3000 来访问')
})