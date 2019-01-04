'use strict'

// let fs = require('fs');
// fs.readFile('sample.txt','utf-8',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })

//异步读取文件
// let fs = require('fs');
// fs.readFile('sample.png',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         console.log(data.length + 'bytes');
//         //console.log(data.toString('utf-8'));
//     }
// })
// console.log('-----1')

//同步读取文件
// let fs = require('fs'),
//     data = fs.readFileSync('sample.txt','utf-8');
// console.log(data);

// //同步读取文件发生错误，则需要用try...catch捕获该错误：
// try{
//     let data1 = fs.readFileSync('sample.1.txt','utf-8');
//     console.log(data1);
// }catch(err){
//     console.log(err);
// }

//写文件 (已存在的文件会覆盖原有的内容，不存在的文件新建写入)
//同步使用writeFileSync
let fs = require('fs');
let txt = 'this is the newly added text',
    txt1 = 'this is the newly added text 11'
fs.writeFile('sample-add.txt',txt,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('ok');
    }
});
fs.writeFileSync('samole-add.txt',txt);

//stat()获取文件信息
//statSync同步
fs.stat('sample.txt',function(err,stat){
    if(err){
        console.log(err);
    }else{
        //是否是文件
        console.log('isFile--' + stat.isFile());
        //是否是目录
        console.log('isDirectory--' + stat.isDirectory())
        if(stat.isFile()){
            //文件大小
            console.log('size--'+ stat.size);
            //创建时间，date对象
            console.log('birth time' + stat.birthtime);
            //修改时间，date对象
            console.log('modified time' + stat.mtime);
        }
    }
})

let txtInfo = fs.statSync('sample.txt');
// console.log(txtInfo);






