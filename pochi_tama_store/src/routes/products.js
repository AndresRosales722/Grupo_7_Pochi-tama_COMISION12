let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/productsController')

router.get('/',controller.cart)



module.exports = router