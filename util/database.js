const Sequelize = require('sequelize');

const sequelize = new Sequelize('product_review', 'root', 'Aj****', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;

