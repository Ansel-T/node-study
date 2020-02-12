const fs = require("fs");
const path = require("path");
const time = new Date().getTime();

function init(){
    let tagetPath = __dirname;
    eachFilePath(tagetPath);
}

/**
 * 区分文件类型 对html文件进行操作
 *
 * @param {*} path
 */
function eachFilePath(path) {
    let files = fs.readdirSync(path);
    files.forEach((v,i) => {
        let filePath = path+'/'+v;
        let stat = fs.statSync(filePath); //获取文件信息
        if(stat.isDirectory()){
            eachFilePath(filePath);
        }else{
            let fileNameArr = v.split(".");
            if(fileNameArr[1] === "html"){
                replaceRev(filePath);
            }
        }
    })
}

/**
 * 生成版本参数
 *
 * @param {*} filePath
 */
function replaceRev(filePath){
    fs.readFile(filePath,function(err,file){
        if(err){
            console.log(err);
            console.log(filePath+"----文件读取失败")
            return;
        }
        let newcontext = file.toString();
        newcontext = replaceCssRev(newcontext);
        newcontext = replaceJsRev(newcontext);
        fs.writeFile(filePath,newcontext,function(err){
            if(err){
                console.log(err);
                console.log(filePath+"----文件写入失败")
                return;
            }
            console.log(filePath +"------------------版本号更新成功");
        })
    })
}

function replaceCssRev(context){
    let linkReg = /<link.*?href=(?:"[^"]*"|'[^']*')[^<>]*>/g;
    let srcReg = /href=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let cssUrlArr = context.match(linkReg);
    if(cssUrlArr){
        for (var i = 0; i < cssUrlArr.length; i++) {
            var src = cssUrlArr[i].match(srcReg);
            var url = src[1]
            if(url){
                var currentUrlArr =  url.split("?v=");
                var newUrl = currentUrlArr[0] + "?v=" + time;
                context = context.replace(url,newUrl);
            }
        }
    }

    return context;
}

function replaceJsRev(context){
    let scriptReg = /<script.*?src=\"(.+?)\">.*?<\/script>/g;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let jsUrlArr = context.match(scriptReg);
    if(jsUrlArr){
        for (var i = 0; i < jsUrlArr.length; i++) {
            var src = jsUrlArr[i].match(srcReg);
            var url = src[1]
            if(url){
                var currentUrlArr =  url.split("?v=");
                var newUrl = currentUrlArr[0] + "?v=" + time;
                context = context.replace(url,newUrl);
            }
        }
    }
    return context;
}


// var testStr ='da<script type="text/javascript" src="./test.js?v=1581428761619"></script>dasd<link rel="stylesheet" href="./js/md5.js?v=1581428761619">sdadadasd<link rel="stylesheet" href="./test.css"><script type="text/javascript" src="./js/md5.js?v=1581428761619"></script><script>console.log(123)</script>'


// var linkReg = /<link.*?href=(?:"[^"]*"|'[^']*')[^<>]*>/g;

// var scriptReg = /<script.*?src=\"(.+?)\">.*?<\/script>/g
// //匹配src属性
// var jsarr = testStr.match(scriptReg);
// var cssarr = testStr.match(linkReg);
// var srcReg = /href=[\'\"]?([^\'\"]*)[\'\"]?/i;

// console.log(cssarr);
// for (var i = 0; i < cssarr.length; i++) {
//  var src = cssarr[i].match(srcReg);
//  var url = src[1]
// //  console.log(src);
//  //获取地址
//  if(url){
//      var urlArr =  url.split("?v=");
//      var newUrl = urlArr[0] + "?v=" + 8888888;
//      console.log(url);
//      testStr = testStr.replace(url,newUrl);
//  }
//  //当然你也可以替换src属性
//  if (src[0]) {
//   var t = src[0].replace(/src/i, "href");
//   //alert(t);
//  }
// }

init();