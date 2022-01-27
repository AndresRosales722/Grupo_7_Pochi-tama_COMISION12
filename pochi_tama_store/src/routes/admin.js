let express = require('express') 
let router = express.Router() 
const upload = require('../middlewares/uploadProductFiles')  // Requerimos a multer
let controller = require('../controllers/adminController')
let productFormValidator = require('../validations/productFormValidator')
/* let userAdminCheck= require('../middlewares/userAdminCheck') */


// listado de productos
router.get('/', /* userAdminCheck, */ controller.list)

// Formulario de creacion de un producto
router.get('/Create/', /* userAdminCheck, */ controller.add);

// Donde viaja la informacion de creacion del producto
router.post('/',upload.single('image'), /* userAdminCheck, */productFormValidator,controller.create);  

// Formulario de edicion de un producto
router.get('/:id/edit', /* userAdminCheck, */ controller.edit);

// Donde viaja la informacion de edicion
router.put('/:id',upload.single('image'),/*  userAdminCheck,  */controller.update);

// Eliminacion de un producto
router.delete('/:id', /* userAdminCheck, */ controller.destroy);



module.exports = router