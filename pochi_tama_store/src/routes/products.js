let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')


router.get('/productCart',controller.cart)

router.get('/productdetail',controller.detail)




module.exports = router