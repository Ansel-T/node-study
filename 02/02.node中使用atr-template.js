const http = require('http');
const fs = require('fs');
const template = require('art-template');
const server = http.createServer();

server.on('request',function (req,res) {
    console.log('接受到请求')
    fs.readFile('./tpl.html',function (err,data) {
        if (err) {
          return  console.log('404 Not Found');
        }
        let content = template.render(data.toString(),{
            name:'jim',
            age:'18',
            hobbies:['sing','basketball','watch movie']
        })
        res.end(content);
    })
})

server.listen('3000',function () {
    console.log('server runding....')
});