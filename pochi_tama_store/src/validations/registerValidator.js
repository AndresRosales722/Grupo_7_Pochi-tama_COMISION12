const {check} = require('express-validator') // Requeriamos el metodo Check de express validator


// Validaciones
module.exports = [

    check('nombre')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio').bail()
    .isLength({min:3, max:20})
    .withMessage('El nombre debe tener entre 3 y 20 caracteres'),

    check('apellido')
    .notEmpty()
    .withMessage('El campo apellido es obligatorio').bail()
    .isLength({min:3, max:20})
    .withMessage('El campo apellido debe tener entre 3 y 20 caracteres'),
    
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email valido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
]