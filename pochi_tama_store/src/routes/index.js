const express = require('express') // Requerimos express
const router = express.Router() // Ejecutamos express
const controller = require('../controllers/indexController') // Requerimos el controlador que esta en la carpeta controllers

router.get('/',controller.index) // Hacemos la conexion con el medoto index del controlado 

module.exports = router // Para exportarlo 