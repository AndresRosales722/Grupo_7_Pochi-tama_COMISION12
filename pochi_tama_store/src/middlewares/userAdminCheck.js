const session = require('../controllers/adminController')

function userAdminCheck(req,res,next){
    if(req.session.user === 'USER_ADMIN'){
        next()
    }else{
        res.redirect('/users/login')
    }  
}

module.exports = userAdminCheck
