class Carrito {
    constructor() {
        this.productos = [];
        this.total = 0;
    }

    agregarProducto(producto, cantidad = 1) {
        const productoData = {
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: cantidad
        };

        const index = this.productos.findIndex(item => item.id === productoData.id);
        if (index > -1) {
            this.productos[index].cantidad += cantidad;
        } else {
            this.productos.push(productoData);
        }
        this.calcularTotal();
    }

    actualizarProducto(productoId, cantidad) {
        const index = this.productos.findIndex(item => item.id === String(productoId));
        if (index > -1) {
            // Aseguramos que la cantidad es mayor a 0 para evitar borrado accidental
            this.productos[index].cantidad = cantidad > 0 ? cantidad : 1;
            this.calcularTotal();
        }
    }

    eliminarProducto(productoId) {
        this.productos = this.productos.filter(item => item.id !== productoId);
        this.calcularTotal();
    }

    calcularTotal() {
        this.total = this.productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    vaciarCarrito() {
        this.productos = [];
        this.total = 0;
    }
}

module.exports = Carrito;