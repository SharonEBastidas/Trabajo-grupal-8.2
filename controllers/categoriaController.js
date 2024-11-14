const categoriaService = require('../services/categoriaServicio');
const Categoria = require('../models/Categoria');

const title = 'Ecommerce';
const url = 'categorias';
const ruta = 'Categorias';

const getCategoryList = async (req, res) => {
    try {
        const datos = await categoriaService.obtenerTodasLasCategorias();
        const columnas = [];
        if(datos.length !== 0){
            datos[0]['_options'].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }

        if (req.headers.accept === 'application/json') {
            return res.status(200).json({ columnas, datos });
        }
        
        res.render('admin/show', {title, url, ruta, columnas, datos});
    } catch (error) {
        console.error('Error al obtener la lista de categorias:', error);
        res.status(500).json({ message: 'Error al obtener la lista de categorias.' });
    }
};

const getAddCategoriaForm = async (req, res) => {
    try {
        res.render('admin/categoria/add', {title, url, ruta});
    } catch (error) {
        console.error('Error al obtener el formulario de agregar categoria:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de agregar categoria.' });
    }
}

const addCategoria =async (req, res) => {
    try {
        if(!req.body.nombre || !req.body.descripcion) throw new Error('Valores de entrada inválidos.')

        await categoriaService.crearCategoria(req.body);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al agregar la categoria:', error);
        res.status(500).json({ message: 'Error al agregar la categoria.' });
    }
};

// Consultar categoría por id
const getConsultShowCategoriaForm = async (req, res) => {
    try {
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        const content = {texto: 'Consultar',  action: 'consult', title, url, ruta, categorias}
        res.render('admin/categoria/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de consulta de producto:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de consulta de producto.' });
    }
}

const showCategoria = async (req, res) => {
    try {
        const datos = await categoriaService.obtenerCategoriaPorId(req.body.categoria);
        if (!datos) {
            return res.status(404).json({ message: 'Categoria no encontrada.' });
        }

        const columnas = [];
        if(datos.length !== 0){
            datos['_options'].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }
        res.render('admin/consultShow', {title, url, ruta, columnas, datos});
    } catch (error) {
        console.error('Error al mostrar la categoria:', error);
        res.status(500).json({ message: 'Error al mostrar la categoria.' });
    }
}

// Actualizar información de categoría
const getConsultEditCategoriaForm = async (req, res) => {
    try {
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        const content = {texto: 'Editar',  action: 'edit', title, url, ruta, categorias}
        res.render('admin/categoria/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de edición de categoria:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de categoria.' });
    }
}

const getEditCategoriaForm = async (req, res) => {
    try {
        let categoria;
        if(Object.keys(req.body).length === 0) {
            categoria = await categoriaService.obtenerCategoriaPorId(req.params.id);
        } else {
            categoria = await categoriaService.obtenerCategoriaPorId(req.body.categoria);
        }

        if (!categoria) {
            return res.status(404).json({ message: 'Categoria no encontrada.' });
        }
        res.render('admin/categoria/edit', {title, url, ruta, categoria});
    } catch (error) {
        console.error('Error al obtener el formulario de edición de categoria:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de edición de categoria.' });
    }
}

const editCategoria = async (req, res) => {
    try {
        if(!req.body.nombre || !req.body.descripcion) throw new Error('Valores de entrada inválidos.')

        await categoriaService.actualizarCategoria(req.params.id, req.body);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ message: 'Error al actualizar la categoria.' });
    }
}

// Eliminar registro de categoria
const getConsultDeleteCategoriaForm = async (req, res) => {
    try {
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        const content = {texto: 'Eliminar', action: 'delete/${categoria.id}', title, url, ruta, categorias}
        res.render('admin/categoria/consult', content);
    } catch (error) {
        console.error('Error al obtener el formulario de eliminación de categoria:', error);
        res.status(500).json({ message: 'Error al obtener el formulario de eliminación de categoria.' });
    }
}

const deleteCategoriaForm = async (req, res) => {
    try {
        if(!req.body.categoria) throw new Error('Valores de entrada inválidos.')

        await categoriaService.eliminarCategoria(req.body.categoria);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ message: 'Error al eliminar la categoria.' });
    }
}

const deleteCategoria = async (req, res) => {
    try {
        if(!req.params.id) throw new Error('Valores de entrada inválidos.')

        await categoriaService.eliminarCategoria(req.params.id);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ message: 'Error al eliminar la categoria.' });
    }
}

module.exports = {
    getCategoryList,
    getAddCategoriaForm,
    addCategoria,
    getConsultShowCategoriaForm,
    showCategoria,
    getConsultEditCategoriaForm,
    getEditCategoriaForm,
    editCategoria,
    getConsultDeleteCategoriaForm,
    deleteCategoriaForm,
    deleteCategoria
    
};

