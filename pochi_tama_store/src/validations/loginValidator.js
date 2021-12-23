const {check} = require('express-validator') // Requeriamos el metodo Check de express validator


// Validaciones
module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email valido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isUppercase()
    
]