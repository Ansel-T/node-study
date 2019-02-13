const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('students',function (req,res) {
    fs.readFile('./db.json','utf-8',function (err,data) {
        if(err){
            return res.status(500).send('Server error.')
        }
        let students = JSON.parse(data).students;
        res.render('index.html',{
            courses:['html','css','javascript','nodejs'],
            students
        });
    })

});

router.get('/students/new',function (req,res) {

});

router.POST('/students/new',function (req,res) {

});

router.get('/students/edit',function (req,res) {

});

router.POST('/students/edit',function (req,res) {

});

router.get('/students/delete',function (req,res) {

});

module.exports = router;