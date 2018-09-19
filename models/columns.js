module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define('Columns', {
    name: DataTypes.STRING,
    board_id: DataTypes.INTEGER,

  }, {});
  Columns.associate = (db) => {
    Columns.belongsTo(db.Boards, { foreignKey: 'id' });
    Columns.hasMany(db.Tasks, { foreignKey: 'column_id' });
  };
  return Columns;
};