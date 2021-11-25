let express = require('express') 
let router = express.Router() 
let controller = require('../controllers/detailController')

router.get('/',controller.detail)



module.exports = router