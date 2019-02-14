const express = require('express');
const fs = require('fs');
const router = express.Router();
const students = require('./db');

router.get('/students',function (req,res) {
    students.find(function (err,students) {
        if(err){
            return res.status(500).send('Server error.');
        }
        res.render('index.html',{
            courses:['html','css','javascript','nodejs'],
            students:students
        })
    })
});

router.get('/students/new',function (req,res) {
    res.render('new.html');
});

router.post('/students/new',function (req,res) {
    let info = req.body;
    fs.readFile('./db.json',function(err,data){
        if(err){
            return res.end('Not Fount 404');
        }
        let studentsObj = JSON.parse(data);
        info.id = 9;
        studentsObj.students.push(req.body);
        studentsObj = JSON.stringify(studentsObj);
        fs.writeFile('./db.json',studentsObj,function (err) {
            if(err){
                return res.end('写入失败');
            }
            res.redirect('/students');
        })
    })
});

router.get('/students/edit',function (req,res) {

});

router.post('/students/edit',function (req,res) {

});

router.get('/students/delete',function (req,res) {

});

module.exports = router;