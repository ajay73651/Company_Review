const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Student = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  company_name: Sequelize.STRING,
  pros: Sequelize.STRING,
  cons: Sequelize.STRING,
  ratings: Sequelize.INTEGER
});

module.exports = Student;
