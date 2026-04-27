const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/conexion')

const Operacion = sequelize.define('Operacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    numero2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    operacion: {
        type: DataTypes.ENUM('suma', 'resta', 'multiplicacion', 'division'),
        allowNull: false
    },
    resultado: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'operaciones',
    timestamps: true
})

module.exports = Operacion