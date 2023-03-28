'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('teams', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    teamName: {
      field: 'team_name',
      allowNull: false,
      type: Sequelize.STRING,
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('teams');
  }
};
