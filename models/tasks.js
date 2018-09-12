'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    position: DataTypes.INTEGER,
    column_id: DataTypes.INTEGER
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};