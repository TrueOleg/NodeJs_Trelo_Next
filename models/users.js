'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function (db) {
    Users.hasMany(db.Boards)
  };
  return Users;
};