module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('Boards', {
    title: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    owned: DataTypes.BOOLEAN
  }, {});
  Boards.associate = (db) => {
    Boards.hasMany(db.Columns)
    Boards.belongsToMany(db.Users, {
      through: db.Shares,
      foreignKey: 'board_id',
      as: 'shares'
    });
  };
  return Boards;
};