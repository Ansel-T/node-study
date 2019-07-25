const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 链接数据库
mongoose.connect('mongodb://localhost/students',{ useNewUrlParser: true });

//设计文档结构
const studentSchema = new Schema({
    name:{
        type:String,
        required:true //必须项
    },
    gender:{
        type:Number,
        enum:[0,1],
        default:0,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    hobbies:{
        type:String
    }
})

module.exports = mongoose.model("Student",studentSchema);