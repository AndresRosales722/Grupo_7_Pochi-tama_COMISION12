const express = require('express') 
const router = express.Router() 

const {show,add,remove} = require('../controllers/cartController') // Requerimos el controlador que esta en la carpeta controllers

router
    .get('/show',show)
    .post('/:id',add)
    .delete('/:id',remove)

module.exports = router 