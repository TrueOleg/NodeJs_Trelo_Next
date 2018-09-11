module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  User.associate = function() {
    // associations can be defined here
  };
  return User;
};
