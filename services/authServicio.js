const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usuarioAdd = async (data) => {
    return await Usuario.create(data);
};

const usuarioLogin = async (correo, contrasena) => {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const validarContrasena = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validarContrasena) throw new Error('contraseña incorrecta');
    
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET);
    return { token, rol: usuario.rol };
}

module.exports = {
    usuarioLogin,
    usuarioAdd
};