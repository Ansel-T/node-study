const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 链接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

//设计文档结构
const userSchema = new Schema({
    username:{
        type:String,
        required:true //必须项
    },
    password:{
        type:String,
        required:true
    }
})

//将文档结构发布为模型
 const User = mongoose.model('User',userSchema);

 // 增删改查

 /**
  * 保存数据
  */
var admin = new User({
    username:"admin",
    password:"123456"
})

/* admin.save(function (err,ret) {
    if(err){
        console.log(err);
        console.log("保存失败")
        return;
    }
    console.log("保存成功",ret);

}) */

/**
 * 查询数据
 */

/*  User.find(function (err,ret) {
     if(err){
         console.log('查询失败',err);
         return ;
     }
     console.log(ret);
 }) */

/*  User.findOne({username:"admin"},function (err,ret) {
     if(err){
         console.log("查询失败",err);
         return;
     }
     console.log(ret);
 }) */

 /**
  * 更新数据
  */

 /*  User.findByIdAndUpdate('5d355bd3aa33712500cc0515',{password:"654321"},function(err,ret){
      if(err){
          console.log("更新失败",err);
          return;
      }
      console.log(ret);
  }) */

  /**
   * 删除数据
   */
  User.deleteOne({username:"admin"},function(err,ret){
      if(err){
          console.log("删除失败",err)
          return;
      }
      console.log(ret);
  })