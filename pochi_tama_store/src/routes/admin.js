let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/adminController')



router.get('/productCreate',controller.productCreate)

router.get('/productEdit',controller.productEdit)




module.exports = router