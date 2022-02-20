const express = require('express') // Requerimos express
const router = express.Router() // Ejecutamos express
const controller = require('../controllers/indexController') // Requerimos el controlador que esta en la carpeta controllers

router.get('/',controller.index) // vista del home

router.get('/comoComprar',controller.comprar) // vista  de como comprar

router.get('/terms',controller.terms) // vista de  terminos y condiciones

router.get('/sucursales',controller.sucursales) // vista de contacto


module.exports = router // Para exportarlo 