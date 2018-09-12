module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define('Columns', {
    name: DataTypes.STRING,
    board_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Boards',
        key: 'id'
      }
    }
  }, {});
  Columns.associate = (db) => {
    Columns.belongsTo(db.Boards)
    Columns.hasMany(db.Tasks)
  };
  return Columns;
};