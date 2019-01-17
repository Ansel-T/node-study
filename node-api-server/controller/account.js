function userInfo(req,res){
    res.end('user info....');
};

function createUser(req,res) {
    res.end('create user success');
};

exports = module.exports = {
    userInfo,
    createUser
}
