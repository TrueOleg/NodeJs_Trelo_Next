module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('Boards', {
    name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    owned: DataTypes.BOOLEAN
  }, {});
  Boards.associate = (db) => {
    Boards.hasMany(db.Columns)
    Boards.belongsToMany(db.Users, {
      through: db.Share,
      foreignKey: 'board_id',
      as: 'share'
    });
  };
  return Boards;
};