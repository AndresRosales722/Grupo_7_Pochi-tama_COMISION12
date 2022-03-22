const {check} = require('express-validator') 

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio').bail()
    .isLength({min:5, max:50})
    .withMessage('El nombre debe tener entre 5 y 50 caracteres'),
     
    check('category')
    .notEmpty()
    .withMessage('Debes elegir una categoría'),

    check('subcategory')
    .notEmpty()
    .withMessage('Debes elegir una subcategoría'),

    check('price')
    .notEmpty()
    .withMessage('Debes ingresar un precio').bail()
    .isNumeric()
    .withMessage('Solo numeros'),

    check('discount')
    .isNumeric()
    .withMessage('Solo numeros'),

    check('description')
    .isLength({min:20, max:500})
    .withMessage('La descripcion debe tener entre 20 y 500 caracteres')
]
