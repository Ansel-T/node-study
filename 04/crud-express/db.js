/**
 * 数据操作文件模块
 */

 const fs = require('fs');
 const dbPath = './db.json';

 /**
  * 获取学生数据
  */
 exports.find = function(callback){
    fs.readFile(dbPath,'utf-8',function (err,data) {
        if(err){
            callback(err);
        }
        callback(null,JSON.parse(data).students);
    })
 };
 /**
  * 添加学员数据
  */

 /**
  * 更新学员数据
  */

  /**
   * 删除学员数据
   */