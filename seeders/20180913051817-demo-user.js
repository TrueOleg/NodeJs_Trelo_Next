
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "email@gmail.com",
          login: "Batman",
          password: "1",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("Users", null, {})
};
