const db = require("../models/index");
let User = require("../models/user");

module.exports = {
    user: User(db.sequelize, db.Sequelize)
};
