const db = require("../models/index");
let User = require("../models/user");
let Cars = require("../models/cars");
let Stories = require("../models/story");

module.exports = {
    user: User(db.sequelize, db.Sequelize),
    cars: Cars(db.sequelize, db.Sequelize),
    stories: Stories(db.sequelize, db.Sequelize)
};
