### require 方法加载规则

+ 核心模块
    - 模块名称
+ 第三方模块
    - 模块名
+ 自己写的模块
    - 路径
+ 优先从缓存加载
+ 第三方模块加载机制
     先找到当前文件所处目录中的 node_modules 目录
    - node_modules/XXX
    - node_modules/XXX/package.json 文件
    - node_modules/art-template/package.json 文件中的 main 属性  (index.js 备选项)
    - 如果以上所有任何一个条件都不成立，则会进入上一级目录中的 node_modules 目录查找
    - 按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx

### npm

+ 切换下载源

```
npm config set registry  https://registry.npm.taobao.org

```

+ 查看 npm 配置信息
```
npm config list
```

### 使用 nodemon 工具自动重启服务
 nodemon 是一个基于Node.js开发的第三方命令行工具。

+ 安装
```
npm install --global nodemon
```
+ 安装完成使用
```
node app.js

//使用  nodemon
nodemon app.js
```
通过 `nodemon` 启动的服务，它会监听文件的变化，当文件修改时,会自动从起服务。

### express

#### 静态资源

```
// 直接就可以访问 /资源
//当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问
app.use(express.static('public'));
// 通过访问 /static/资源
app.use('/static/',express.static('public'));
```
具体可以参考 express 官方快速入门 很清楚！！！

#### express 中使用art-template
+ 安装 express 和 express-art-template
```
npm install --save art-template
npm install --save express-art-template
```
+ 配置&&使用 art-template 模板引擎
```
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
app.engine('art', require('express-art-template'));

// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了

app.get('/', function (req, res) {
    res.render('index.art', {title:'art-template'});
});

// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

```
+ 可以通过 app.set() 修改默认的 views 目录
```
// app.set('views', 目录路径)
```

#### 在 express 中获取GET请求参数

express 中内置了一个API,可以通过 req.query 获取

```
app.get('/leaveMsg',function (req,res) {
    let comment = req.query;
    console.log(comment); //{ name: 'jim', message: '321456789 ' }
});
```

###  在 express 中获取POST请求参数

express 中没有内置可以直接获取请求参数的API ，需要使用一个第三方中间件 `body-parser` 来实现

安装：
```
$ npm install body-parser
```
配置：
```
//0.引入
var bodyParser = require('body-parser')

//2.配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```
使用：
```
app.post('/leaveMsg',function (req,res) {
    let comment = req.body;
    console.log(comment);
});
```


### 基本感知