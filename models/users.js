
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Users.associate = function (db) {
    Users.hasMany(db.Boards)
  };

  return Users;
};