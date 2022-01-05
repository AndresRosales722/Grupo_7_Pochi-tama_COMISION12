const USER_LOGIN = "USER"

function userCheck(req,res,next){
    if(USER_LOGIN === 'USER'){
        next()
    }else{
        res.send('Tu vieja')
    }  
}

module.exports = userCheck