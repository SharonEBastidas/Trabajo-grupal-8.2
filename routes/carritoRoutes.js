const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/', carritoController.getCarrito);
router.post('/agregar/:id', carritoController.agregarProductoAlCarrito);
router.post('/actualizar/:id', carritoController.actualizarProductoEnCarrito);
router.post('/eliminar/:id', carritoController.eliminarProductoDelCarrito);
router.post('/vaciar', carritoController.vaciarCarrito);

module.exports = router;