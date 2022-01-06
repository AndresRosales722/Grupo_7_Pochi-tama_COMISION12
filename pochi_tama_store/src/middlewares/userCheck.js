const USER_LOGIN = "USER"

function userCheck(req,res,next){
    if(req.session.user.rol === 'ROL_USER'){
        next()
    }else{
        res.redirect('/')
    }  
}

module.exports = userCheck