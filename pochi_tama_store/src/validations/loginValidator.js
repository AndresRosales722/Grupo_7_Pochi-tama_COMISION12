const {check,body} = require('express-validator') // Requeriamos el metodo Check de express validator
const {users} = require('../database/dataBase')
const bcrypt = require ('bcryptjs')


// Validaciones
module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email valido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail(),
    
    body('custom')
    .custom((value,{req})=>{
        let user = users.find(user => user.email === req.body.email)

        if(user){
            if(bcrypt.compareSync(req.body.pass, user.pass)){
                return true
            }else{
                return false
            }
        }else{
            return false
        }

    }).withMessage('Credenciales invalidas')
    
]