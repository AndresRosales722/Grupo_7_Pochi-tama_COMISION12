let express = require('express');
let router = express.Router();
let controller = require('../../controllers/api/apiProducts');

router.get('/api/v1/products', controller.products);




module.exports = router