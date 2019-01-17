exports = module.exports = [
    {
        method:'GET',
        path:'/api/user',
        impl:'account.userInfo'
    },
    {
        method:'POST',
        path:'/api/user',
        impl:'account.createUser'
    },
]