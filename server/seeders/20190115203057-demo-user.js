'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            id: "b147bf15-0825-4910-b006-78a86d643a33",
            firstName: "John",
            lastName: "Doe",
            email: "demo@demo.com",
            hash: "$2a$10$eGAPpnZXA7bNWudWwj9FpOIH/WydBEx5oNQcXLM7cn6W3yPnfDs.y", //123456789
            username: "Demo",
            createdAt: "2021-01-14 15:13:25",
            updatedAt: "2021-01-14 15:13:25"
        }], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
