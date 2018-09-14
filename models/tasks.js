module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    position: DataTypes.INTEGER,
    column_id: DataTypes.INTEGER,


  }, {});
  Tasks.associate = (db) => {
    Tasks.belongsTo(db.Columns)
  };
  return Tasks;
};