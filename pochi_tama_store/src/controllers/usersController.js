const { validationResult } = require ('express-validator') // Requerimos el metodo validationResult de express-validator

let controller = {
    login: (req, res) => {
        res.render('users/login')
    },
    processLogin: (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){
            res.send('logueado')
        }else{
            res.render('users/login',{
                errors: errors.mapped()
            })
        }
    },
    register: (req, res) => {
        res.render('users/register')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            res.send('Te registraste')
        }else{
            res.render('users/register',{
                errors: errors.mapped(),
                old:req.body
            })
        }
    }
}

module.exports = controller