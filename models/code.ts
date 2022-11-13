const { sequelize } = require('../server/core/db');
const { DataTypes } = require('sequelize');

export const Code = sequelize.define('Code', {
  userId: { type: DataTypes.INTEGER },
  confirmationCode: { type: DataTypes.STRING },
});
