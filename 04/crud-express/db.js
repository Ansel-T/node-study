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
        console.log(data);
        callback(null,JSON.parse(data).students);
    })
 };

 /**
  * 添加学员数据
  */
 exports.save = function(student,callback){
     fs.readFile(dbPath,'utf-8',function (err,data) {
         if(err){
             callback(err);
         }
         let students = JSON.parse(data).students;
         student.id = students[students.length - 1].id + 1;
         students.push(student);
         var fileData = JSON.stringify({students});
         fs.writeFile(dbPath,fileData,function (err) {
             if(err){
                 callback(err);
             }
             callback(null);
         })
     })
 }

 /**
  * 获取指定学员数据
  */

  exports.findById = function(id,callback){
      fs.readFile(dbPath,'utf-8',function (err,data) {
          if(err){
            callback(err);
          }

          let studentsArr = JSON.parse(data).students;
          let student = studentsArr.find(function (v,i) {
              return Number(id) === Number(v.id);
          })
          callback(null,student);
      })
  }


 /**
  * 更新学员数据
  */

  exports.updated = function (student,callback) {
      fs.readFile(dbPath,'utf-8',function(err,data){
          if(err){
              callback(err);
          }
          let studentsArr = JSON.parse(data).students;
          let info = studentsArr.find(function (v,i) {
              return v.id === student.id;
          })

          for(let key in student){
            info[key] = student[key];
          }

          fs.writeFile(dbPath,JSON.stringify({students:studentsArr}),function (err) {
              if(err){
                  callback(err);
              }
              callback(null);
          })

      })
  }

  /**
   * 删除学员数据
   */