"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      await queryInterface.bulkInsert("ec_users", [
        {
          user_Id: "1",
          firstName: "Abhishek",
          lastName: "Parkar",
          username: "admin",
          age: "21",
          email: "abhishek@gmail.com",
          phone: "2345678901",
          password:
            "$2b$10$vhKPitJwxIYO5g/M0TqhTuJtW6MDagLo0b6pwxiIthijO.E5RJr/a",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
