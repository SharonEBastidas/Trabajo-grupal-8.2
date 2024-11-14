const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
    host: process.env.db_host,
    port: process.env.port,
    dialect: 'postgres',
});

const conectToBD = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Postgres conectado...');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, conectToBD };