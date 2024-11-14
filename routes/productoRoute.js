const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const upload = require('../middlewares/upload');

// Ruta para listar los productos
router.get('/', productoController.getProductList);

// Ruta para obtener el formulario de agregar producto
router.get('/add', productoController.getAddProductoForm);

// Ruta para agregar un nuevo producto
router.post('/add', upload.single('imagen'), productoController.addProducto);

// Ruta para obtener el formulario de consulta de producto
router.get('/consult', productoController.getConsultShowProductoForm);

// Ruta para mostrar un producto
router.post('/consult', productoController.showProducto);

// Ruta para obtener el formulario de consulta de edición de producto
router.get('/edit', productoController.getConsultEditProductoForm);

// Ruta para obtener el formulario de edición de un producto
router.post('/edit/', productoController.getEditProductoForm);

// Ruta para editar un producto desde la lista
router.post('/:id/edit', productoController.getEditProductoForm);

// Ruta para actualizar un producto
router.post('/edit/:id', productoController.editProducto);

// Ruta para obtener el formulario de eliminación de producto
router.get('/delete', productoController.getConsultDeleteProductoForm);

// Ruta para eliminar un producto
router.post('/delete/:id', productoController.deleteProductoForm);

// Ruta para eliminar un producto desde la lista
router.post('/:id/delete', productoController.deleteProducto)

module.exports = router;
