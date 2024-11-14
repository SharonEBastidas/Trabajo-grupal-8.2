const usuarioService = require('../services/usuarioService');
const authService = require('../services/authServicio');
const productoService = require('../services/productoServicio');

const bcrypt = require('bcrypt');

const title = 'Ecommerce';
// Pagina de registro inicial
const getRegistroForm = async (req, res) => {
    res.render('registro', {title});
}

// Registro de Usuario
const registerUser = async (req, res) => {
    console.log('Iniciando registro...');
    const { nombre, apellido, correo, telefono, contrasena, rol } = req.body;
    try {
        const usuarioExistente = await usuarioService.getUserByEmail(correo);
        if (usuarioExistente) {
            console.log('El correo ya está registrado.');
            return res.status(400).render('auth/register', { error: 'El correo ya está registrado.' });
        } else{
            console.log('Creando usuario...');
            const contrasenaHash = await bcrypt.hash(contrasena, 10);
            await authService.usuarioAdd({ nombre, apellido, correo, telefono, contrasena: contrasenaHash, rol });
            console.log('Registro exitoso, redirigiendo a /login');
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error en el registro:', error.message);
        return res.status(400).send(error.message);
    }
};

// Inicio de Sesión (Login)
const loginUser = async (req, res) => {
    
    try {
        const { correo, contrasena } = req.body;

        const { token, rol } = await authService.usuarioLogin(correo, contrasena);
        
        req.session.user = {
            correo: correo,
            perfil: rol,
        }

        res.cookie('token', token, { httpOnly: true });
        
        if (rol === 'comprador') {
            return res.redirect('/comprador');
        } else if (rol === 'admin') {
            return res.redirect('/admin/usuarios');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(400).send(error.message);
    }
};

// Pagina de login inicial
const getLoginForm = async (req, res) => {
    res.render('login', {title});
}

//redirigir vista comprador
const viewComprador = async(req, res) =>{
    const datos = await productoService.obtenerTodosLosProductos();
    res.render('comprador', { title, datos });
};

module.exports = { 
    registerUser,
    getRegistroForm, 
    loginUser,
    getLoginForm,
    viewComprador,
};