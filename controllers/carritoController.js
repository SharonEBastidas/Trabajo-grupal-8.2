const Carrito = require('../services/carritoServicio');
const productoService = require('../services/productoServicio');

function obtenerCarrito(req) {
    if (!req.session.carrito) {
        req.session.carrito = new Carrito();
    } else if (!(req.session.carrito instanceof Carrito)) {
        const carritoData = req.session.carrito;
        req.session.carrito = new Carrito();
        req.session.carrito.productos = carritoData.productos;
        req.session.carrito.total = carritoData.total;
    }
} 

const getCarrito = (req, res) => {
    obtenerCarrito(req);

    const error = req.session.error;
    req.session.error = null;

    res.render('carrito', { carrito: req.session.carrito, error });
};

const agregarProductoAlCarrito = async (req, res) => {
    try {
        obtenerCarrito(req);

        const producto = await productoService.obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        req.session.carrito.agregarProducto(producto, 1);
        req.session.save(() => {
            res.redirect('/comprador/carrito');
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar producto al carrito.' });
    }
};

const actualizarProductoEnCarrito = async (req, res) => {
    obtenerCarrito(req);

    const cantidad = parseInt(req.body.cantidad, 10); 
    if (isNaN(cantidad) || cantidad < 1) {
        return res.status(400).json({ message: 'Cantidad inválida' });
    }
    //validar stock
    const producto = await productoService.obtenerProductoPorId(req.params.id);
    if (cantidad > producto.inventario) {
        req.session.error = 'Cantidad '+ cantidad + ' supera el stock';
        return res.redirect('/comprador/carrito');
    }

    req.session.carrito.actualizarProducto(req.params.id, cantidad);
    req.session.error = null;
    req.session.save(() => {
        res.redirect('/comprador/carrito'); 
    });
};

const eliminarProductoDelCarrito = (req, res) => {
    obtenerCarrito(req); 
    req.session.carrito.eliminarProducto(req.params.id);
    req.session.save(() => {
        res.redirect('/comprador/carrito'); 
    });
};

const vaciarCarrito = (req, res) => {
    obtenerCarrito(req); 
    req.session.carrito.vaciarCarrito();
    req.session.save(() => {
        res.redirect('/comprador/carrito'); 
    });
};

module.exports = {
    getCarrito,
    agregarProductoAlCarrito,
    actualizarProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito
}