const express = require('express');
const router = express.Router();

var student = require('../controllers/student');

// home page
router.get('/',function (req,res) {
    res.redirect('/students');
})

//students
router.get('/students',student.showStudent); //学生列表

router.get('/students/new',student.showStudentNew);//添加学生页面
router.post('/students/new',student.studentNew);//添加学生

router.get('/students/edit',student.showStudentEdit);//编辑学生页面
router.post('/students/edit',student.studentEdit);//编辑学生

router.get('/students/delete',student.studentDelete);//删除学生

module.exports = router;