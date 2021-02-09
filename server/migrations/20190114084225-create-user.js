'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            hash: {
                allowNull: false,
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING,
                defaultValue: ""
            },
            lastName: {
                type: Sequelize.STRING,
                defaultValue: ""
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: ""
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};