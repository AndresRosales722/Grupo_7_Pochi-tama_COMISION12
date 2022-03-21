let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')


router.get('/allProducts', controller.allProducts);   // Detalle del producto

router.get('/detail/:id/', controller.detail);   // Detalle del producto

router.get('/productCart',controller.cart)  // Carrito de compras
router.post('/:id',controller.add)  
 
/* GET - List of products */
router.get('/category/:id', controller.category)

/* GET - List of product (Subcategories) */
router.get('/subcategory/:subcategory/:category_id', controller.subcategory)

/* GET Buscador */
router.get('/search',controller.search)





module.exports = router