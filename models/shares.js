'use strict';
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Shares', {
    board_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Share.associate = function(models) {
    // associations can be defined here
  };
  return Share;
};