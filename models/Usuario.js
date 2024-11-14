const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:{avgs:[8,100], msg:'Password debe tener al menos 8 digitos'},
            notEmpty: {msg: 'El password no puede ser vacio'}
        }
    },
    telefono: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "comprador"
    }
});

module.exports= Usuario;