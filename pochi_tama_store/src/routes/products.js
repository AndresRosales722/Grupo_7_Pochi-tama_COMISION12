let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')

router.get('/',controller.index)   // Listado de productos

router.get('/productdetail/:id/', controller.detail);   // Detalle del producto

router.get('/productCart',controller.cart)  // Carrito de compras
 
router.get('/productCreate/', controller.create);  // Creacion de un producto

router.post('/create', controller.store);  // Formulario de creacion del producto

router.get('/:id/edit', controller.edit); 
router.put('/:id', controller.update); 




module.exports = router