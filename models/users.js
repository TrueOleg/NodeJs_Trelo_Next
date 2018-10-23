module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Users.associate = db => {
    Users.hasMany(db.Boards, { foreignKey: 'owner' });
    // Users.hasMany(db.Shares, { foreignKey: "user_id" });
    Users.belongsToMany(db.Boards, {
      through: db.Shares,
      foreignKey: 'user_id',
      as: 'share'
    });
  };

  return Users;
};
