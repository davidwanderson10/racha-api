const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pontos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cotas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  jogos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  vitorias: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  empates: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  derrotas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gols_pro: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gols_contra: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  '1o': {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  '2o': {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  '3o': {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  '4o': {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gols: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ass: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  amarelo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  vermelho: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

  // Adicione outros campos conforme sua tabela
}, {
  tableName: 'players'
});

module.exports = Player;