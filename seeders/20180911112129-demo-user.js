module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "oleg",
          email: "email",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete("Users", null, {})
};
