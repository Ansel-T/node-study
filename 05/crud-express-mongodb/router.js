const express = require('express');
const fs = require('fs');
const router = express.Router();
const Student = require('./models/student');

router.get('/',function (req,res) {
    res.redirect('/students');
})

router.get('/students',function (req,res) {
    Student.find(function (err,students) {
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
   new Student(req.body).save(function (err) {
        if(err){
            return res.status(500).send('Server error');
        };
        res.redirect('/students');
    })
});

router.get('/students/edit',function (req,res) {
    console.log(req.query);
    Student.findById(req.query.id,function (err,info) {
        if(err){
            return res.status(500).send('Server error');
        };
        res.render('edit.html',{
            info
        });
    })

});

router.post('/students/edit',function (req,res) {
    Student.findByIdAndUpdate(req.body.id,req.body,function (err) {
        if(err){
            return res.status(500).send('Server error');
        };
        res.redirect('/students');
    })
});

router.get('/students/delete',function (req,res) {
    Student.deleteOne({"_id":req.query.id},function (err) {
        if(err){
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.redirect('/students');
    })
});

module.exports = router;