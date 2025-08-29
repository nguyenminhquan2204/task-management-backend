'user-strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
         {
            firstName: 'Nguyen',
            lastName: 'Quan',
            email: 'nguyenquan@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ]);
   },
   down: async (queryInterface, Sequelize) => {

   }
}