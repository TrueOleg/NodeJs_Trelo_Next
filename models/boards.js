module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('Boards', {
    title: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    owned: DataTypes.BOOLEAN
  }, {});
  Boards.associate = (db) => {
    Boards.belongsTo(db.Users, { foreignKey: 'id' });
    Boards.hasMany(db.Columns, { foreignKey: 'board_id' });
    Boards.belongsToMany(db.Users, {
      through: db.Shares,
      foreignKey: 'board_id',
      as: 'shares'
    });
  };
  return Boards;
};