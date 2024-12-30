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
  '1o': {
    type: DataTypes.STRING,
    allowNull: true
  },
  '2o': {
    type: DataTypes.STRING,
    allowNull: true
  },
  '3o': {
    type: DataTypes.STRING,
    allowNull: true
  },
  '4o': {
    type: DataTypes.STRING,
    allowNull: true
  },
  times: {
    type: DataTypes.JSON,
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