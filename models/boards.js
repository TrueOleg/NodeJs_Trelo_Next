module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('Boards', {
    name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,

    owned: DataTypes.BOOLEAN
  }, {});
  Boards.associate = (db) => {
    Boards.belongsTo(db.Users)
    Boards.hasMany(db.Columns)
  };
  return Boards;
};