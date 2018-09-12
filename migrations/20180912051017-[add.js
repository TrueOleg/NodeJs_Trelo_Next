module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Users", "login", Sequelize.STRING),

  down: queryInterface => queryInterface.removeColumn("Users", "login")
};
