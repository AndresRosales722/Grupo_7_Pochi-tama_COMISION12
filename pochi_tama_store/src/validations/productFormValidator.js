const {check} = require('express-validator') 

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio').bail()
    .isLength({min:5, max:50})
    .withMessage('El nombre debe tener entre 5 y 50 caracteres')
    ,
    
    
    /* check('category')
    .notEmpty()
    .withMessage('Debes elegir una categoria'),

    check('subcategory')
    .notEmpty()
    .withMessage('Debes elegir una subcategoria'), */

    check('price')
    .notEmpty()
    .withMessage('Debes ingresar un precio').bail()
    .isNumeric()
    .withMessage('Solo numeros'),

    check('discount')
    .isNumeric()
    .withMessage('Solo numeros'),

    check('description')
    .isLength({max:300})
    .withMessage('El nombre puede tener hasta 300 caracteres')
]
