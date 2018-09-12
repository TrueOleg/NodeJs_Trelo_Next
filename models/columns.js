'use strict';
module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define('Columns', {
    name: DataTypes.STRING
  }, {});
  Columns.associate = function(models) {
    // associations can be defined here
  };
  return Columns;
};