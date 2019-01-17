const http = require('http');
const url = require('url');
const config = require('./config/config');
const controllers = require('./controller/index');
const route = require('./router/router').map((item) => {
    let tuple = item.impl.split('.');
    item.impl = controllers[tuple[0]][tuple[1]];
    return item;
})

http
    .createServer(function (req,res) {
        let method = req.method;
        let reqUrl = url.parse(req.url);
        let matchRoute  = route.find(item => {
            return item.method === method && item.path === reqUrl.pathname;
        })
        if(matchRoute){
            matchRoute.impl(req,res);
            return;
        }

        req.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end('404 Not Fount');
    })
    .listen(config.port,config.hostname,function(){
        console.log('server running....' )
    })