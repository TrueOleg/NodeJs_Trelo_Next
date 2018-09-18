
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
  Users.associate = (db) => {
    Users.belongsToMany(db.Boards, {
      through: db.Share,
      foreignKey: 'user_id',
      as: 'share'
    });
  };

  return Users;
};