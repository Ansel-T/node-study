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
npm config set registry  htts://registry.npm.taobao.org

```

+ 查看 npm 配置信息
```
npm config list
```


### express 安装

### 基本感知