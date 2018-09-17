
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "sups@gmail.com",
          login: "Superman",
          password: "1",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("Users", null, {})
};
