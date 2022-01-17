let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/usersController')
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let uploadFile = require('../middlewares/uploadAvatar')
let userCheck = require('../middlewares/userCheck')


/* GET Formulario de Login */
router.get('/login',controller.login)

/* POST Informacion del login */
router.post('/login',loginValidator,controller.processLogin)

/* GET Formulario de Registro */
router.get('/register', controller.register)

/* POST Informacion del Registro */
router.post('/register',uploadFile.single('avatar'),registerValidator, controller.processRegister)

/* GET - Cerrar sesion */
router.get('/logout',controller.logout)

/* GET perfil de usuario */
router.get('/profile',controller.profile)



module.exports = router