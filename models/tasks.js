module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    position: DataTypes.INTEGER,
    column_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Columns',
        key: 'id'
      }
    }
  }, {});
  Tasks.associate = (db) => {
    Tasks.belongsTo(db.Columns)
  };
  return Tasks;
};