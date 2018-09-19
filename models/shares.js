"use strict";
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define(
    "Shares",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      board_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  Share.associate = db => {
    // Share.belongsTo(db.Users, { foreignKey: "id" });
    // Share.belongsTo(db.Boards, { foreignKey: "id" });
  };
  return Share;
};
