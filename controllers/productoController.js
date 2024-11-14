const productoService = require('../services/productoServicio');
const categoriaService = require('../services/categoriaServicio');

const title = 'Ecommerce';
const url = 'productos';
const ruta = 'Productos';


const getProductList = async (req, res) => {
    try {

        const datos = await productoService.obtenerTodosLosProductos();
        const columnas = [];

                if (datos.length !== 0) {
            datos[0]['_options'].attributes.forEach(dato => {
                if (dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna); 
                }
            });
        }

        if (req.headers.accept === 'application/json') {
            return res.status(200).json({ columnas, datos });
        }

        res.render('admin/show', { title, url, ruta, columnas, datos });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        
        res.status(500).json({ message: 'Error al obtener la lista de productos.' });
    }
};


const getAddProductoForm = async (req, res) => {
    try {
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        res.render('admin/producto/add', { title, url, ruta, categorias });
    } catch (error) {
        console.error('Error al obtener el formulario de agregar producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de agregar producto.' });
    }
};

const addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, inventario, categoria } = req.body;
        const imagen = req.file ? req.file.path : null;

        if(!nombre || !descripcion || !precio || !inventario || !categoria) throw new Error('Valores de entrada inválidos.')
        
        await productoService.crearProducto({
            nombre,
            descripcion,
            precio,
            inventario,
            categoria,
            imagen, 
        });
        
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ message: 'Error al agregar el producto.' });
    }
};

const getConsultShowProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: 'Consultar', action: 'consult', title, url, ruta, productos};
        res.render('admin/producto/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de consulta de producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de consulta de producto.' });
    }
}


const showProducto = async (req, res) => {
    try {
        const datos = await productoService.obtenerProductoPorId(req.body.producto);
        if (!datos) {
            
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        const columnas = [];
    
        if (datos.length !== 0) {
            datos['_options'].attributes.forEach(dato => {
                if (dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna);
                }
            });
        }

        if (req.headers.accept === 'application/json') {
            return res.status(200).json({ columnas, datos });
        }

        res.render('admin/consultShow', { title, url, ruta, columnas, datos });
    } catch (error) {
        console.error('Error al mostrar el producto:', error);
        res.status(500).json({ message: 'Error al mostrar el producto.' });
    }
};

const getConsultEditProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: 'Editar', action: 'edit', title, url, ruta, productos};
        res.render('admin/producto/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de edición de producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de producto.' });
    }
}

const getEditProductoForm = async (req, res) => {
    try {
        let producto;
        if(Object.keys(req.body).length === 0) {
            producto = await productoService.obtenerProductoPorId(req.params.id);
        } else {
            producto = await productoService.obtenerProductoPorId(req.body.producto);
        }
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.render('admin/producto/edit', {title, url, ruta, producto});
    } catch (error) {
        console.error('Error al obtener el formulario de edición de producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de producto.' });
    }
}

const editProducto = async (req, res) => {
    try {
        if(!req.body.nombre || !req.body.descripcion || !req.body.precio || !req.body.inventario || !req.body.categoria) throw new Error('Valores de entrada inválidos.')

        await productoService.actualizarProducto(req.params.id, req.body);
        
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};

const getConsultDeleteProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: 'Eliminar', action: 'delete/${producto.id}', title, url, ruta, productos};
        res.render('admin/producto/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de eliminación de producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de eliminación de producto.' });
    }
}

const deleteProductoForm = async (req, res) => {
    try {
        if(!req.body.producto) throw new Error('Valores de entrada inválidos.');

        await productoService.eliminarProducto(req.body.producto);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
}

const deleteProducto = async (req, res) => {
    try {
        if(!req.params.id) throw new Error('Valores de entrada inválidos.');
        
        await productoService.eliminarProducto(req.params.id);
        
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};

module.exports = {
    getProductList,
    getAddProductoForm,
    addProducto,
    getConsultShowProductoForm,
    showProducto,
    getConsultEditProductoForm,
    getEditProductoForm,
    editProducto,
    getConsultDeleteProductoForm,
    deleteProductoForm,
    deleteProducto
};