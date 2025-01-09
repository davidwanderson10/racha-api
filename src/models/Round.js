const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Round = sequelize.define('Round', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gols: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  assistencias: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  amarelos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  vermelhos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  artilheiro: {
    type: DataTypes.JSON,
    allowNull: true
  },
  assistente: {
    type: DataTypes.JSON,
    allowNull: true
  },
  primeiro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  segundo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  terceiro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quarto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: true
  }

  // Adicione outros campos conforme sua tabela
}, {
  tableName: 'rounds'
});

module.exports = Round;