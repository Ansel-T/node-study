const http = require('http');
const fs = require('fs'),
      url = require('url'),
      template = require('art-template');

var comments = [
    {
        name:'zhangsan',
        message:'怎么还不下雪呀',
        dateTime:'2019-01-10'
    },
    {
        name:'zhangsan',
        message:'怎么还不下雪呀',
        dateTime:'2019-01-10'
    },
    {
        name:'zhangsan',
        message:'怎么还不下雪呀',
        dateTime:'2019-01-10'
    },
]

http
    .createServer(function (req,res) {
        console.log('接受到请求');
        let parseObj = url.parse(req.url,true),
            pathname = parseObj.pathname;
        if (pathname === '/') {
            fs.readFile('./views/index.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found');
                }
                let commentsStr = template.render(data.toString(),{comments});
                res.end(commentsStr);
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found');
                }
                res.end(data);
            })
        } else if (pathname.indexOf('/public/') === 0) {
            fs.readFile('.'+pathname,function(err,data){
                if (err) {
                    return res.end('404 Not Found');
                }
                res.end(data);
            })
        } else if(pathname === "/pinglun") {
            let comment = parseObj.query;
            let date = new Date();
            let dateTime = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
            comment.dateTime = dateTime;
            comments.unshift(comment);
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end();
        } else {
            fs.readFile('./views/404.html',function (err,data) {
                if(err){
                    return res.end('404 Not Found.')
                }
                res.end(data);
            })
        }
    })
    .listen('3000',function () {
        console.log('server runding...');
    })
