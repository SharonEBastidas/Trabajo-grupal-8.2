const userService = require('../services/usuarioService');
const Usuario = require('../models/Usuario');

const title = 'Ecommerce';
const url = 'usuarios';
const ruta = 'Usuarios';

const getAllUsers = async (req, res) => {
    try {
        const datos = await userService.getAllUsers();
        const columnas = [];
        if(datos.length !== 0){
            datos[0]['_options'].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'contrasena' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }

        if (req.headers.accept === 'application/json') {
            return res.status(200).json({usuarios: datos});
        }

        res.render('admin/show', {title, url, ruta, columnas, datos});
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ message: 'Error al obtener la lista de usuarios.' });
    }
}


const getAddUserForm = async (req, res) => {
    try {
        res.render('admin/usuario/add', {title, url, ruta});
    } catch (error) {
        console.error('Error al obtener el formulario de agregar usuario:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de agregar usuario.' });
    }
}

const addUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono, contrasena, rol} = req.body;

        if(!nombre || !apellido || !correo || !telefono || !contrasena || !rol) throw new Error('Valores de entrada inválidos.')

        await userService.addUser(nombre, apellido, correo, telefono, contrasena, rol);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ message: 'Error al agregar usuario.' });
    }
}


const getConsultGetUserForm = async (req, res) => {
    try {
        const content = {texto: 'Consultar',  action: 'consult', title, url, ruta}
        res.render('admin/usuario/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de consulta de usuario:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de consulta de usuario.' });
    }
}

const getUser = async (req, res) => {
    try {
        const datos = await userService.getUserByEmail(req.body.correo);
        const columnas = [];
        if(datos.length !== 0){
            datos['_options'].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'contrasena' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }
        res.render('admin/consultShow', {title, url, ruta, columnas, datos})
    } catch (error) {
        console.error('Error al mostrar el usuario:', error);
        res.status(500).json({ message: 'Error al mostrar el usuario.' });
    }
}


const getConsultEditUserForm = async (req, res) => {
    try {
        const content = {texto: 'Editar',  action: 'edit', title, url, ruta}
        res.render('admin/usuario/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de edición de usuario:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de usuario.' });
    }
}

const getEditUserForm = async (req, res) => {
    try {
        let usuario;
        if(Object.keys(req.body).length === 0) {
            usuario = await userService.getUserById(req.params.id);
        } else {
            usuario = await userService.getUserByEmail(req.body.correo);
        }

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        res.render('admin/usuario/edit', {title, url, ruta, usuario});
    } catch (error) {
        console.error('Error al obtener el formulario de edición de usuario:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de usuario.' });
    }
}

const editUser = async (req, res) => {
    try {
        if(!req.body.nombre || !req.body.apellido || !req.body.correo || !req.body.telefono || !req.body.contrasena || !req.body.rol) throw new Error('Valores de entrada inválidos.');

        await userService.editUser(req.body.correo, req.body);

        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario.' });
    }
}


const getConsultDeleteUserForm = async (req, res) => {
    try {
        const content = {texto: 'Eliminar',  action: 'delete/${usuario.id}', title, url, ruta}
        res.render('admin/usuario/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de eliminación de usuario:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de eliminación de usuario.' });
    }
}

const deleteUserForm = async (req, res) => {
    try {
        if(!req.body.correo) throw new Error('Valores de entrada inválidos.');

        await userService.deleteUserByEmail(req.body.correo);

        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar al usuario:', error);
        res.status(500).json({ message: 'Error al eliminar al usuario.' });
    }
}

const deleteUser = async (req, res) => {
    try {
        if(!req.params.id) throw new Error('Valores de entrada inválidos.');

        await userService.deleteUserById(req.params.id);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar al usuario:', error);
        res.status(500).json({ message: 'Error al eliminar al usuario.' });
    }
}

module.exports = {
    getAllUsers,
    getAddUserForm,
    addUser,
    getConsultGetUserForm,
    getUser,
    getConsultEditUserForm,
    getEditUserForm,
    editUser,
    getConsultDeleteUserForm,
    deleteUserForm,
    deleteUser
};