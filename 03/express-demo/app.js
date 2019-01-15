//1.引入

const express = require('express');

//2.创建
// 相当于 http.createServer();
const app = express();

// 公开指定目录
//这样就可以通过/public/xxx 的方式访问 public 中的静态资源了
app.use('/public/',express.static('./public'));

app.get('/',function (req,res) {
    res.send('helow express');
})

//相当于 server.listen
app.listen('3000',function () {
    console.log('app is runding at port 3000');
})