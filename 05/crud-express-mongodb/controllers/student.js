var Student = require('../models').Student


exports.showStudent = function (req,res) {
    Student.find(function (err,students) {
        if(err){
            return res.status(500).send('Server error.');
        }
        res.render('index.html',{
            courses:['html','css','javascript','nodejs'],
            students:students
        })
    })
}

exports.showStudentNew = function (req,res) {
    res.render('new.html');
};

 /**
  * 添加学员数据
  */
exports.studentNew = function (req,res) {
    new Student(req.body).save(function (err) {
         if(err){
             return res.status(500).send('Server error');
         };
         res.redirect('/students');
     })
 }

 exports.showStudentEdit = function (req,res) {
    Student.findById(req.query.id,function (err,info) {
        if(err){
            return res.status(500).send('Server error');
        };
        res.render('edit.html',{
            info
        });
    })

}

 /**
  * 更新学员数据
  */
 exports.studentEdit = function (req,res) {
    Student.findByIdAndUpdate(req.body.id,req.body,function (err) {
        if(err){
            return res.status(500).send('Server error');
        };
        res.redirect('/students');
    })
}

  /**
   * 删除学员数据
   */
 exports.studentDelete = function (req,res) {
    Student.deleteOne({"_id":req.query.id},function (err) {
        if(err){
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.redirect('/students');
    })
}


