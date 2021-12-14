let express = require('express') 
let router = express.Router() 
const upload = require('../middlewares/uploadProductFiles')  // Requerimos a multer
let controller = require('../controllers/adminController')



router.get('/',controller.index)  // listado de productos

router.get('/Create/', controller.create);  // Formulario de creacion de un producto

router.post('/',upload.single('image'),controller.store);  // Donde viaja la informacion de creacion del producto , agregar tambien la linea del middleware para la funcion de multer entre la ruta y el controller

router.get('/:id/edit', controller.edit);  // Formulario de edicion de un producto

router.put('/:id',upload.single('image'), controller.update);    // Donde viaja la informacion de edicion

router.delete('/:id', controller.destroy);  // Eliminacion de un producto



module.exports = router