let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')


router.get('/detail/:id/', controller.detail);   // Detalle del producto

router.get('/productCart',controller.cart)  // Carrito de compras
 
/* GET - List of products */
router.get('/category/:id', controller.category)

/* GET - List of product (Subcategories) */
router.get('/subcategory/:subcategory/:categoryId', controller.subcategory)

/* GET Buscador */
router.get('/search',controller.search)





module.exports = router