const USER_LOGIN = 0

function userCheck(req,res,next){
    if(req.session.user.rol == 0){
        next()
    }else{
        res.redirect('/')
    }  
}

module.exports = userCheck