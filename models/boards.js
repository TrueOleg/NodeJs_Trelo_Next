'use strict';
module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('Boards', {
    name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    users_ids: DataTypes.INTEGER,
    owned: DataTypes.BOOLEAN
  }, {});
  Boards.associate = function(models) {
    // associations can be defined here
  };
  return Boards;
};