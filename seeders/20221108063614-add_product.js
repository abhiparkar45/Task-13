'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('ec_products',[{
      productName:"SmartPhone 1",
      productPrice:100,
      productDescription:"dsghdghjds kjdf rhiuyusrhu euhyiurehe uhiuheu triue i teyu hyiue i iu",
      inStock:true,
      category_Id:1,
      imageID:1,
      createdAt: new Date(),
      updatedAt: new Date()
     }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
