let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/adminController')



router.get('/',controller.index)  // listado de productos

router.get('/Create/', controller.create);  // Formulario de creacion de un producto

router.post('/create', controller.store);  // Donde viaja la informacion de creacion del producto

router.get('/:id/edit', controller.edit);  // Formulario de edicion de un producto

router.put('/:id', controller.update);    // Donde viaja la informacion de edicion

router.delete('/:id', controller.destroy);  // Eliminacion de un producto



module.exports = router