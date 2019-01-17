const http = require('http');
const fs = require('fs'),
      url = require('url'),
      template = require('art-template');
const express = require('express');
const app = express();
// 使用 express-art-template
app.engine('html', require('express-art-template'));
// 开放 public 目录
app.use('/public/',express.static('./public'))

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

app.get('/',function (req,res) {
    res.render('index.html',{comments});
});

app.get('/post',function (req,res) {
    res.render('post.html');
});

app.get('/pinglun',function (req,res) {
    let comment = req.query;
    console.log(comment);
    let date = new Date();
    let dateTime = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
    comment.dateTime = dateTime;
    comments.unshift(comment);
    res.redirect('/');
});

app.listen('3000',function () {
    console.log('server running...');
})
