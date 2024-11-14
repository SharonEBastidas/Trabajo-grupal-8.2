const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Ruta para listar las categorias
router.get('/', categoriaController.getCategoryList);

// Ruta para mostrar el formulario de agregar categoria
router.get('/add', categoriaController.getAddCategoriaForm);

// Ruta para agregar una nueva categoria
router.post('/add', categoriaController.addCategoria);

// Ruta para mostrar el formulario de consulta de categoria por id
router.get('/consult', categoriaController.getConsultShowCategoriaForm);

// Ruta para consultar una categoria
router.post('/consult', categoriaController.showCategoria);

// Ruta para mostrar el formulario de edición de categoria
router.get('/edit', categoriaController.getConsultEditCategoriaForm);

// Ruta para editar una categoria desde el formulario
router.post('/edit/', categoriaController.getEditCategoriaForm);

// Ruta para editar una categoria desde la lista
router.post('/:id/edit', categoriaController.getEditCategoriaForm);

// Ruta para editar un categoria
router.post('/edit/:id', categoriaController.editCategoria);

// Ruta para mostrar el formulario de eliminación de categoria
router.get('/delete', categoriaController.getConsultDeleteCategoriaForm);

// Ruta para eliminar una categoria desde el formulario
router.post('/delete/:id', categoriaController.deleteCategoriaForm);

// Ruta para eliminar una categoria desde la lista
router.post('/:id/delete', categoriaController.deleteCategoria)


module.exports = router;