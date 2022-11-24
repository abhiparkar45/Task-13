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
    // await queryInterface.bulkInsert('ec_images', [{
    //   imageID: 1,
    //   imgName: "1232434343.jpg",
    //   imgURL: "something.com/image",
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }, {
    //   imageID: 2,
    //   imgName: "12346767434343.jpg",
    //   imgURL: "something.com/image",
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }])
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
