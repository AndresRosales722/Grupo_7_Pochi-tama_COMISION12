let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')

/* router.get('/',controller.index)   // Listado de productos */

router.get('/detail/:id/', controller.detail);   // Detalle del producto

router.get('/productCart',controller.cart)  // Carrito de compras
 


















module.exports = router