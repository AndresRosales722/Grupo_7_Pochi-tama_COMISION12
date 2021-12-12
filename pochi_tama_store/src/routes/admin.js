let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/adminController')



router.get('/',controller.admin)

router.get('/productCreate',controller.productCreate)

router.get('/productEdit',controller.productEdit)

router.get('/product', controller.productAdmin)


module.exports = router