'use strict'
const fs = require('fs');
let rs = fs.createReadStream('sample.txt','utf-8');
rs.on('data',function(chunk){
    console.log('data');
    console.log(chunk);
})
rs.on('end',function(chunk){
    console.log('end');
    console.log(chunk);
})
rs.on('error',function(err){
    console.log('err' + err);
})

let ws1 = fs.createWriteStream('output1.txt','utf-8');
ws1.write('使用Stream写入文本数据');
ws1.write('end');
ws1.end();
//所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable

let rs1 = fs.createReadStream('output1.txt'),
    ws = fs.createWriteStream('copied.txt');
    rs1.pipe(ws);
//默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数
//readable.pipe(writable, { end: false });