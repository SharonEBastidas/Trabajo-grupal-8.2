const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');

// Ruta para listar los usuarios
router.get('/', userController.getAllUsers);

// Ruta para mostrar el formulario de agregar usuario
router.get('/add', userController.getAddUserForm);

// Ruta para agregar un nuevo usuario
router.post('/add', userController.addUser);

// Ruta para mostrar el formulario de consulta de usuario
router.get('/consult', userController.getConsultGetUserForm);

// Ruta para consultar un usuario
router.post('/consult', userController.getUser);

// Ruta para obtener el formulario de consulta de edición de usuario
router.get('/edit', userController.getConsultEditUserForm);

// Ruta para mostrar el formulario de edición de usuario
router.post('/edit', userController.getEditUserForm);

// Ruta para editar un usuario desde la lista
router.post('/:id/edit', userController.getEditUserForm);

// Ruta para editar un usuario
router.post('/edit/:id', userController.editUser);

// Ruta para mostrar el formulario de eliminación de usuario
router.get('/delete', userController.getConsultDeleteUserForm);

// Ruta para eliminar un usuario
router.post('/delete/:correo', userController.deleteUserForm);

// Ruta para eliminar un usuario desde la lista
router.post('/:id/delete', userController.deleteUser)

module.exports = router;
