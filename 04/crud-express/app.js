const express = require('express');
const fs = require('fs');

const app = express();

app.engine('html', require('express-art-template'));
app.use('/node_modules/',express.static('./node_modules'));
app.use('/public/',express.static('./public'));

app.get('/',function (req,res) {
    fs.readFile('./db.json','utf-8',function (err,data) {
        if(err){
            return res.status(500).send('Server error.')
        }
        let students = JSON.parse(data).students;
        console.log(students);
        res.render('index.html',{
            courses:['html','css','javascript','nodejs'],
            students
        });
    })

});

app.listen('3000',function () {
    console.log('running server...');
})