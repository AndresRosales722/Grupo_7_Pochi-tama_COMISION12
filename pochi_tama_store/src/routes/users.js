let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/usersController')
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')

/* GET Formulario de Login */
router.get('/login',controller.login)

/* POST Informacion del login */
router.post('/login',loginValidator,controller.processLogin)

/* GET Formulario de Registro */
router.get('/register', controller.register)

/* POST Informacion del Registro */
router.post('/register',registerValidator, controller.processRegister)


module.exports = router