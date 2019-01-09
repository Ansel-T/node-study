const http = require('http'),
      fs = require('fs');
const server = http.createServer();

let wwwDir = 'E:/project/www';
server.on('request',function (req,res) {
    console.log('接受到请求');
    fs.readFile('./template.html',function (err,data) {
        if(err){
            return res.end('404 Not Found')
        }

        fs.readdir(wwwDir,function (err,files) {
            if(err){
                return res.end('wwwDir not find');
            }
            let content = '';
            files.forEach(item => {
                content += `
                        <tr>
                            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
                            <td class="detailsColumn" data-value="0"></td>
                            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                        </tr>
                        `
            });

            data = data.toString().replace('^_^', content);
            res.end(data);
        })

    })
});

server.listen('3000',function () {
    console.log('runding.......')
})