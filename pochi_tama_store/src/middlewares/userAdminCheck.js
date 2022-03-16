 function userAdminCheck(req,res,next){
    console.log(req.session.user)
    if(req.session.user && req.session.user.rol === 1){
        next()
    }else{
        res.redirect('/')
    }  
}

module.exports = userAdminCheck
