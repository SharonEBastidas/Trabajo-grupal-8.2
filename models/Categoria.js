const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Categoria = sequelize.define('Categoria', {
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
  descripcion: {
    type: DataTypes.STRING,
  }
});

module.exports = Categoria;
