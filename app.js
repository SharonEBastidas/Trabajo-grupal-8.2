const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { conectToBD, sequelize } = require('./config/db');

const app = express();
const port = 8000;

// Conectar a la base de datos
conectToBD();

sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos.');
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//configuracion base para sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

//en caso de que no haya una sesion iniciada
app.use((req, res, next) =>{
    res.locals.user = req.session.user;
    next();
});

//rutas
const usuarioRoute = require('./routes/usuarioRoute');
const productoRoute = require('./routes/productoRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const compradorRoute = require('./routes/compradorRoute');
const carritoRoutes = require('./routes/carritoRoutes');
const apiRoute = require('./routes/apiRoute');
const webpayRoutes = require('./routes/webpay_plus');

//rutas funcionalidades
app.use('/admin/usuarios', usuarioRoute);
app.use('/admin/productos', productoRoute);
app.use('/admin/categorias', categoriaRoute);
app.use('/', compradorRoute);
app.use('/comprador/carrito', carritoRoutes);

// ruta API
app.use('/api', apiRoute);

//ruta webpay
app.use('/webpay_plus', webpayRoutes);

//carpeta imagenes
app.use('/uploads', express.static('uploads'));

//motor de vistas
app.set('view engine', 'pug');
app.set('views', './views');

//ruta de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'Ecommerce '});
});

require('dotenv').config();
app.listen(port, () => {
    console.log(`Servidor iniciado en https://localhost:${port}`);
})