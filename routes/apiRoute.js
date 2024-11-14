const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/usuarios', apiController.getAllUsers);
router.get('/usuarios/:id', apiController.getUser);
router.post('/usuarios', apiController.addUser);
router.put('/usuarios/:id', apiController.editUser);
router.delete('/usuarios/:id', apiController.deleteUser);

router.get('/productos', apiController.getAllProducts);
router.get('/productos/:id', apiController.getProduct);
router.post('/productos', apiController.addProduct);
router.put('/productos/:id', apiController.editProduct);
router.delete('/productos/:id', apiController.deleteProduct);

router.get('/categorias', apiController.getAllCategories);
router.get('/categorias/:id', apiController.getCategory);
router.post('/categorias', apiController.addCategory);
router.put('/categorias/:id', apiController.editCategory);
router.delete('/categorias/:id', apiController.deleteCategory);

module.exports = router;
