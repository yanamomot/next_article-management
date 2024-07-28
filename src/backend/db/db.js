const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(require("./config.json").development);

module.exports = sequelize;
