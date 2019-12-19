const mongoose = require("mongoose");
// 链接数据库
mongoose.connect('mongodb://localhost/students',{ useNewUrlParser: true });



// models
const student = require('./student');


exports.Student = student;
