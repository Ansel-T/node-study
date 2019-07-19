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

### router模块
+ Express 提供了一种更好的方式,专门用来包装路由的

```
//创建一个js 文件（router.js） 首先引入`express`

const express = require('express');

// 1. 创建一个路由容器
const router = express.Router();

// 2. 把路由都挂载到 router 路由容器中

/*
 * 渲染添加学生页面
 */
router.get('/students/new', function (req, res) {
  //code ....
})

/*
 * 处理添加学生
 */
router.post('/students/new', function (req, res) {
  //code ....
})

//3. 在入口文件中引入路由模块（router.js），然后再挂在到app 服务中

const router = require('./router');

// 把路由容器挂载到 app 服务中
app.use(router)

//注：配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前

```



### MongoDb 安装

#### 关系型数据库和非关系型数据库

表就是关系，或者说表与表之间存在关系
+ 所有的关系型数据库都要通过`sql`语言来操作
+ 所有的关系型数据库在做操之前都需要设计表结构
+ 而且数据表还支持约束
    - 唯一的
    - 主键
    - 默认值
    - 非空
+ 非关系行数据库非常的灵活
+ 有的非关系型数据库就是key-value 键值对
+ 但是 MongoDB 是最像关系型数据库的非关系型数据库
    - 数据库 -> 数据库
    - 数据表 -> 集合(数组)
    - 表记录 -> 文档对象
+ MongoDB 不需要设计表结构
+ 可以任意的往里面存数据，没有结构性这一说

### 启动和关闭数据库

主要参考[菜鸟文档mongoDB 教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)

启动：
```shell
# mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db  作为自己的数据储存目录
# 所以第一次执行该命令前要先手动创建一个数据存储目录
mongod
```
修改默认的数据储存目录：
```shell
mongod --dbpath=数据存储目录路径
```
停止： 直接`Ctrl + c` 就可以了

### 链接和退出数据库

链接：
```shell
# 该命令默认链接本地的 MongoDB 服务
mongo
```
退出：
```shell
# 在链接状态是输入 exit 退出
exit
```
### 基本命令

+ ` show dbs `
    - 查看显示所有数据库
+ `db`
    - 当前操作的数据库
    - MongoDB 中默认的数据库为 test ，因为 test 中没有数据 使用 `show dbs`时并不能看到 test 数据库
+ `use 数据库名称`
    - 切换到指定的数据库（没有就新建）
+ `db.dropDatabase()`
    - 在当前数据库中执行 `db.dropDatabase()` 就会删除当前数据库
+ `db.createCollection()`
    - MongoDB 中使用 createCollection() 方法来创建集合
    - 语法格式: db.createCollection(name, options)
    - 参数：'name'-> 集合名称 ；'options'-> 可选参数
+ `show collections`
    - 查看当前db的所有集合

### 在 Node 中如何操作 MongoDB 数据库
#### 官方推荐包 node-mongodb-native
#### 第三方 mongoose
mongoose：基于官方的`mongodb`包再次封装

+ 官方指南：[指南](https://mongoosejs.com/docs/guide.html)
+ 官方api文档：[api文档](https://mongoosejs.com/docs/api.html)

#### 1.MongoDB 数据库基本概念
+ 可以有多个数据库
+ 一个数据库中可有有多个集合
+ 一个集合中可有有多个文档
+ 文档结构很灵活，没有任何限制
+ MongoDB非常的灵活，不需要像MySQL一样先创建数据库、表、设计表结构
 - 在这里只需要：当你需要插入数据的时候，只需要指往哪个数据库的那个集合操作就可以了
 - 一切都有MongoDb来帮你自动完成建库表这件事

```
{
   qq:{
       user:[
           {name:"zhangsan",age:12},
           {name:"lisi",age:12},
           ......
       ]
   },
   taobao:{

   },
   wexin:{

   }
}
```


