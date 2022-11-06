const { sequelize } = require('../server/core/db');
const { DataTypes } = require('sequelize');

export const User = sequelize.define('User', {
  fullName: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  avatarUrl: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN },
  confirmationCode: { type: DataTypes.STRING, unique: true },
  status: { type: DataTypes.ENUM('Pending', 'Active'), defaultValue: 'Pending' },
});
