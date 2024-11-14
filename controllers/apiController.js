const userService = require('../services/usuarioService');
const productoService = require('../services/productoServicio');
const categoriaService = require('../services/categoriaServicio');

// Usuarios
const getAllUsers = async (req, res) => {
    try {
        const usuarios = await userService.getAllUsers();
        if(usuarios === null) {
            res.status(404).json({message: 'Usuarios No Encontrados'});
        } else {
            res.json(usuarios);
        }
    } catch (error) {
        console.error('Error al obtener a los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener a los usuarios.' });
    }
}

const getUser = async (req, res) => {
    try {
        let id = req.params.id;
        const usuario = await userService.getUserById(id);
    
        if(usuario === null) {
            res.status(404).json({message: 'Usuario No Encontrado'});
        } else {
            res.json({usuario});
        }
    } catch (error) {
        console.error('Error al obtener al usuario:', error);
        res.status(500).json({ message: 'Error al obtener al usuario.' });
    }
}

const addUser = async (req, res) => {
    try {
        let { nombre, apellido, correo, contrasena, telefono, rol } = req.body;
        if(!nombre || !apellido || !correo || !contrasena || !telefono || !rol) {
            res.status(404).json({message: 'Faltan datos del Usuario'});
        } else {
            await userService.addUser(nombre, apellido, correo, telefono, contrasena, rol);
            res.json({message: 'Usuario Agregado'});
        }
    } catch (error) {
        console.error('Error al añadir al usuario:', error);
        res.status(500).json({ message: 'Error al añadir al usuario.' });
    }
}

const editUser = async (req, res) => {
    try {
        let id = req.params.id;
        let { correo } = req.body;
        const usuario = await userService.getUserById(id);
        if(usuario === null) {
            res.status(404).json({message: 'Usuario No Encontrado'});
        } else {
            await userService.editUser(correo, req.body)
            res.json({message: 'Usuario Actualizado'});
        }
    } catch (error) {
        console.error('Error al editar al usuario:', error);
        res.status(500).json({ message: 'Error al editar al usuario.' });
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const usuario = await userService.getUserById(id);
        if(usuario === null) {
            res.status(404).json({message: 'Usuario No Encontrado'});
        } else {
            await userService.deleteUserById(id);
            res.json({message: 'Usuario Eliminado'});
        }
    } catch (error) {
        console.error('Error al eliminar al usuario:', error);
        res.status(500).json({ message: 'Error al eliminar al usuario.' });
    }
}

// Productos
const getAllProducts = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        if (productos === null) {
            res.status(404).json({message: 'Productos No Encontrados'});
        } else {
            res.json({productos})
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
}

const getProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const producto = await productoService.obtenerProductoPorId(id);
    
        if(producto === null) {
            res.status(404).json({message: 'Producto No Encontrado'});
        } else {
            res.json({producto});
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
}

const addProduct = async (req, res) => {
    try {
        let { nombre, descripcion, precio, inventario, categoria } = req.body;
        if(!nombre || !descripcion || !precio || !inventario || !categoria) {
            res.status(404).json({message: 'Faltan datos del Producto'});
        } else {
            await productoService.crearProducto(req.body);
            res.json({message: 'Producto Agregado'});
        }
    } catch (error) {
        console.error('Error al añadir el producto:', error);
        res.status(500).json({ message: 'Error al añadir el producto.' });
    }
}

const editProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const producto = await productoService.obtenerProductoPorId(id);
        if(producto === null) {
            res.status(404).json({message: 'Producto No Encontrado'});
        } else {
            await productoService.actualizarProducto(id, req.body)
            res.json({message: 'Producto Actualizado'});
        }
    } catch (error) {
        console.error('Error al editar el producto:', error);
        res.status(500).json({ message: 'Error al editar el producto.' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const producto = await productoService.obtenerProductoPorId(id);
        if(producto === null) {
            res.status(404).json({message: 'Producto No Encontrado'});
        } else {
            await productoService.eliminarProducto(id);
            res.json({message: 'Producto Eliminado'});
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
}

// Categorias
const getAllCategories = async (req, res) => {
    try {
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        if (categorias === null) {
            res.status(404).json({message: 'Categorias No Encontradas'});
        } else {
            res.json({categorias})
        }
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        res.status(500).json({ message: 'Error al obtener las categorias.' });
    }
}

const getCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const category = await categoriaService.obtenerCategoriaPorId(id);

        if(category === null) {
            res.status(404).json({message: 'Categoria No Encontrada'});
        } else {
            res.json({category});
        }
    } catch (error) {
        console.error('Error al obtener la categoria:', error);
        res.status(500).json({ message: 'Error al obtener la categoria.' });
    }
    
}

const addCategory = async (req, res) => {
    try {
        let { nombre, descripcion } = req.body;
        if(!nombre || !descripcion ) {
            res.status(404).json({message: 'Faltan datos de la Categoria'});
        } else {
            await categoriaService.crearCategoria(req.body);
            res.json({message: 'Categoria Agregado'});
        }
    } catch (error) {
        console.error('Error al añadir la categoria:', error);
        res.status(500).json({ message: 'Error al añadir la categoria.' });
    }
}

const editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const category = await categoriaService.obtenerCategoriaPorId(id);
        if(category === null) {
            res.status(404).json({message: 'Categoria No Encontrada'});
        } else {
            await categoriaService.actualizarCategoria(id, req.body)
            res.json({message: 'Categoria Actualizada'});
        }
    } catch (error) {
        console.error('Error al editar la categoria:', error);
        res.status(500).json({ message: 'Error al editar la categoria.' });
    }
}

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const category = await categoriaService.obtenerCategoriaPorId(id);
        if(category === null) {
            res.status(404).json({message: 'Categoria No Encontrada'});
        } else {
            await categoriaService.eliminarCategoria(id);
            res.json({message: 'Categoria Eliminada'});
        }
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ message: 'Error al eliminar la categoria.' });
    }
}

module.exports = {
    getAllUsers, getUser, addUser, editUser, deleteUser,
    getAllProducts, getProduct, addProduct, editProduct, deleteProduct,
    getAllCategories, getCategory, addCategory, editCategory, deleteCategory,
}